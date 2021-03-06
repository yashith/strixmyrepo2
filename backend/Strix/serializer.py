from rest_framework import serializers
from .models import *

class MediaSerializer(serializers.ModelSerializer):

    class Meta:
        model=TicketMedia
        fields="__all__"
        
class DeveloperSerializer((serializers.ModelSerializer)):
    class Meta:
        model=DeveloperTicket
        fields='__all__'

class UserSerializer((serializers.ModelSerializer)):
    class Meta:
        model=User
        fields=['first_name','last_name']
class TicketSerializer(serializers.ModelSerializer):
    ticketMedia=MediaSerializer(many=True,read_only=True)
    createdby=UserSerializer(read_only=True,source='externaluser')
    
    class Meta:
        model=Ticket
        fields=('__all__') 
        extra_fields=('ticketMedia','createdby')
        
        def create(self,validated_data):
            ticketMedia=validated_data.pop('ticketMedia')
            ticket=Ticket.objects.create(**validated_data)
            for media in ticketMedia:
                TicketMedia.objects.create(**media,issuename=ticket)
            return ticket
        
        

        
         

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields=('__all__')
        # description','projectname
        
    