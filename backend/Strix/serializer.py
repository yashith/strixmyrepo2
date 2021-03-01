from rest_framework import serializers
from .models import *

class MediaSerializer(serializers.ModelSerializer):

    class Meta:
        model=TicketMedia
        fields="__all__"
        # depth=1
class TicketSerializer(serializers.ModelSerializer):
    # ticketMedia=serializers.FileField(source='ticketmedia_set')
    ticketMedia=MediaSerializer(source='ticketmedia_set',many=True)
    class Meta:
        model=Ticket
        fields=('__all__') 
        extra_fields=('ticketMedia')

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
        
    