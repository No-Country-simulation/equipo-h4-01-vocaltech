from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from notifications.models.notifications import Notification
from notifications.serializers.notifications import NotificationSerializer

class NotificationViewSet(viewsets.ModelViewSet)
    queryset = NotificationViewSet.objects.all()