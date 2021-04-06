from rest_framework.views import APIView
from rest_framework.response import Response
import json
from django.core import serializers
from django.contrib.auth.mixins import PermissionRequiredMixin, LoginRequiredMixin
from .mixins import RoleRequiredMixin
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from .models import *
from rest_framework import viewsets


from django.core.exceptions import ValidationError
from django.contrib.auth.tokens import default_token_generator
from .MailService import *
from django.utils.http import urlsafe_base64_decode
from .serializer import *
from django.db import connection


class Login(APIView):

    def post(self, request):

        data = json.loads(request.body)

        print(data)

        email = data['email']
        password = data['password']

        if User.objects.filter(email=email).exists():
            Username = User.objects.get(email=email).username
        else:
            return Response({"msg": "You are not a registered user try again"}, status=404)

        user = authenticate(username=Username, password=password)

        if user is not None:
            auth.login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            role = User.objects.get(
                username=user).groups.values_list('name', flat=True)
            return Response(
                {
                    "Token": token.key,
                    "Role": role[0]
                }, status=200)
        else:
            return Response({"msg": "You are not a registered user try again"}, status=404)


class Logout(APIView):

    def post(self, request):
        print(request.user)
        if request.user.is_anonymous:
            return Response(False, status=404)
        else:
            auth.logout(request)
            return Response(True, status=200)


###############################################################################################


class EmailConfirmation(APIView):

    token_generator = default_token_generator

    def post(self, request):

        data = json.loads(request.body)
        email = data['email']

        opts = {
            'request': self.request,
            'email': email,
            'token_generator': self.token_generator
        }

        if(EmailSend.send(self, **opts)):
            return Response({"key": "Done"}, status=200)
        else:
            return Response({"key": "Not Done"}, status=404)


class PasswordConfirmation(APIView):

    token_generator = default_token_generator

    def post(self, request):

        data = json.loads(request.body)

        uid = data['uid']
        token = data['token']

        try:
            user_id = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(pk=user_id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist, ValidationError):
            user = None

        if self.token_generator.check_token(user, token):
            return Response({"uid": uid, "token": token}, status=200)
        else:

            return Response(False, status=404)


class ResetPassword(APIView):

    token_generator = default_token_generator

    def post(self, request):

        data = json.loads(request.body)
        password = data['password']
        retypedPass = data['retypedPass']
        confirm = data['confirm']

        uid = confirm['uid']
        token = confirm['token']

        try:
            user_id = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(pk=user_id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist, ValidationError):
            user = None

        if self.token_generator.check_token(user, token):
            if password == retypedPass:
                user.set_password(password)
                user.save()
                return Response({}, status=200)
            else:
                return Response(True, status=404)
        else:
            return Response(False, status=404)

###############################################################################################


class ProjectList(APIView):

    def get(self, request):

        user = request.user

        if user.is_anonymous:
            return Response("Thota pissuda", status=404)
        else:
            role = User.objects.get(
                username=user).groups.values_list('name', flat=True)
            if role[0] == 'Admin':
                projects = self.Admin(user)
            else:
                projects = self.OtherUser(user)

        return Response(projects.values(), status=200)

    def Admin(self, user):
        return(Project.objects.filter(adminid=user))

    def OtherUser(self, user):
        return(Project.objects.filter(userlist=user))


# BCLbacklog
# ticketdetails
# @api_view(['GET'])
# def projectTicket(request,projectid):
#     tickets=Ticket.objects.filter(project=projectid)
#     serializer=TicketSerializer(tickets,many=True)
#     return Response(serializer.data)

# #projectdetails
# @api_view(['GET'])
# def getProjectDetails(request,projectid):
#     pdetails=Project.objects.filter(id=projectid)
#     serializer=ProjectSerializer(pdetails,many=True)
#     return Response(serializer.data)
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = self.queryset
        filter_value = self.request.query_params.get('id', None)
        if filter_value is not None:
            queryset = queryset.filter(id=filter_value)
        return queryset


class TicketMediaViewset(viewsets.ModelViewSet):
    queryset = TicketMedia.objects.all()
    serializer_class = MediaSerializer


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def get_queryset(self):  # filter by id query
        queryset = self.queryset
        filter_value = self.request.query_params.get('project', None)
        if filter_value is not None:
            queryset = queryset.filter(project=filter_value)
        return queryset

    def create(self, request, *args, **kwargs):
        ticket_media = request.FILES.getlist('ticketMedia')

        data = request.POST

        ticket_current = Ticket.objects.create(
            issuename=data['issuename'],
            issuedescription=data['issuedescription'],
            bugtype=BugType.objects.get(id=data['bugtype']),
            priority=Priority.objects.get(id=data['priority']),
            severity=Severity.objects.get(id=data['severity']),
            bspstatus=False,
            approval=False,
            totaleffort=data['totaleffort'],
            review=False,
            project=Project.objects.get(id=data['project']),
            workstate=Workstate.objects.get(id=data['workstate']),
            externaluser=User.objects.get(id=data['externaluser'])
        )

        ticket_current.save()

        # print(data['ticketMedia'])
        # print(request.FILES.getlist('ticketMedia'))
        for media in ticket_media:
            MediaInstance = TicketMedia.objects.create(
                issuename=ticket_current,
                files=media
            )

            MediaInstance.save()

        return Response({"data": "success"}, status=200)


# Sprint summary View


class SprintSummary(viewsets.ModelViewSet):
    queryset = Sprint.objects.all()
    serializer_class = SprintSummarySerializer

    def get_queryset(self):  # filter by id query
        queryset = self.queryset
        filter_value = self.request.query_params.get('id', None)
        if filter_value is not None:
            queryset = queryset.filter(id=filter_value)
        return queryset

    def get_queryset(self):  # filter by id query
        queryset = self.queryset
        filter_value = self.request.query_params.get('project', None)
        if filter_value is not None:
            queryset = queryset.filter(project=filter_value)
        return queryset


class BugPerMonth(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    
    def get_queryset(self):  # filter by date
        queryset = self.queryset
        filter_value1 = self.request.query_params.get('date1', None)
        filter_value2 = self.request.query_params.get('date2', None)
        if filter_value1 and filter_value2 is not None:
            queryset = queryset.filter(date__gte=filter_value1,date__lte=filter_value2)
        return queryset


        
