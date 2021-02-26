from rest_framework import serializers
from .models import *

class MediaSerializer(serializers.ModelSerializer):

    class Meta:
        model=TicketMedia
        fields=('files')
class TicketSerializer(serializers.ModelSerializer):
    # ticketMedia=serializers.FileField(source='ticketmedia_set')
    ticketMedia=MediaSerializer(source='ticketmedia_set',many=True)
    class Meta:
        model=Ticket
        fields=('__all__') 
        extra_fields=('ticketMedia')
         

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields=('__all__')
        # description','projectname
        