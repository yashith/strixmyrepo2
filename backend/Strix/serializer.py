from rest_framework import serializers
from .models import *


class MediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = TicketMedia
        fields = "__all__"


class DeveloperSerializer((serializers.ModelSerializer)):
    class Meta:
        model = DeveloperTicket
        fields = '__all__'


class UserSerializer((serializers.ModelSerializer)):
    fullname = serializers.SerializerMethodField('full_name')

    def full_name(self, obj):
        name = obj.first_name + " " + obj.last_name
        return name

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'fullname']


class TicketSerializer(serializers.ModelSerializer):
    ticketMedia = MediaSerializer(source='ticketmedia_set', many=True)
    createdby = UserSerializer(read_only=True, source='externaluser')
    workstatetext = serializers.StringRelatedField(source='workstate')
    priority = serializers.SerializerMethodField()
    workstate=serializers.SerializerMethodField()
    severity=serializers.SerializerMethodField()
    bugtype=serializers.SerializerMethodField()
    workstatetext= serializers.SerializerMethodField()

    def get_priority(self,obj):
        return(obj.priority.priority)
    def get_workstate(self,obj):
        return(obj.workstate.workstatename)
    def get_severity(self,obj):
        return(obj.severity.severity)
    def get_bugtype(self,obj):
        return(obj.bugtype.bugtype)
    def get_workstatetext(self,obj):
        return(obj.workstate.workstatename)
    class Meta:
        model = Ticket
        fields = ('__all__')
        extra_fields = ('ticketMedia', 'createdby', 'workstatetext')

        def create(self, validated_data):
            ticketMedia = validated_data.pop('ticketMedia')
            ticket = Ticket.objects.create(**validated_data)
            for media in ticketMedia:
                TicketMedia.objects.create(**media, issuename=ticket)
            return ticket


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('__all__')
        # description','projectname


class SprintSummarySerializer(serializers.ModelSerializer):

    finished = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    active = serializers.SerializerMethodField()
    estimated_hours = serializers.SerializerMethodField()
    actual_hours = serializers.SerializerMethodField()
    ticketlist=TicketSerializer(many=True,read_only=True)

    def get_finished(self, obj):
        y = 0
        for x in obj.ticketlist.all():
            if(x.workstate.id == 4 ):
                y += 1
        return (y)

    def get_total(self, obj):
        return(obj.ticketlist.all().count())

    def get_active(self, obj):
        y = 0
        for x in obj.ticketlist.all():
            if(x.workstate.id != 4):
                y += 1
        return(y)

    def get_estimated_hours(self, obj):
        enddate = obj.intialenddate
        startdate = obj.startdate
        return((enddate-startdate)/3600)

    def get_actual_hours(self, obj):
        startdate = obj.startdate
        enddate = obj.enddate
        if (enddate is not None and (enddate-startdate) is not None ):
            return((enddate-startdate)/3600)
        else:
            return('Sprint is not finished')

    class Meta:
        model = Sprint
        fields = ('__all__')
        
