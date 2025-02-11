from django.contrib import admin
from unfold.admin import ModelAdmin
from notifications.models import Notification

# Register your models here.
# admin.site.register(Notification)
# class NotificationAdmin(ModelAdmin):
#     list_display = ['title', 'message', 'created_at']
#     search_fields = ['title', 'message']
#     list_filter = ['created_at']