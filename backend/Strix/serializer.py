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
    fullname=serializers.SerializerMethodField('full_name')
    def full_name(self,obj):
            name=obj.first_name +" "+ obj.last_name           
            return name
    class Meta:
        model=User
        fields=['first_name','last_name','fullname']
        
        
class TicketSerializer(serializers.ModelSerializer):
    ticketMedia=MediaSerializer(source='ticketmedia_set',many=True)
    createdby=UserSerializer(read_only=True,source='externaluser')
    workstatetext=serializers.StringRelatedField(source='workstate')
    
    
        
    class Meta:
        model=Ticket
        fields=('__all__') 
        extra_fields=('ticketMedia','createdby','workstatetext')

        
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
        
    