from django.db import transaction
from notifications.models import Notification
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.utils.timezone import now

current_time = now().isoformat()


class NotificationService:

    @classmethod
    def create_login_notification(cls, user):
        notification = Notification.objects.create(
            user=user,
            message=f"Se incursionó su cuenta mediante login {user.username}",
            notification_type="info",
        )
        cls.send_user_logged_in_notification(user)
        return notification

    @classmethod
    def send_user_logged_in_notification(cls, user):
        print("ENTRO AL SENDER DE USER")

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "notifications",  # Sending to the 'executives' channel
            {
                "type": "send.notification",
                "message": f"The user {user.username} with email {user.email} was logged in at {current_time}",
            },
        )

    @classmethod
    @transaction.atomic
    def create_signup_notification(cls, user):
        notification = Notification.objects.create(
            user=user,
            message="Se aplicó un cuenta nueva",
            notification_type="success",
        )
        cls.send_user_signup_notification(user)
        return notification

    @classmethod
    def send_user_signup_notification(cls, user):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "notifications",  # Sending to the 'executives' channel
            {
                "type": "send.notification",
                "message": f"The user {user.username} with email {user.email} was signed in at {current_time}",
            },
        )

    @classmethod
    @transaction.atomic
    def create_updated_leads_profile(cls, user):
        notification = Notification.objects.create(
            user=user,
            message="Actualizó su perfil",
            notification_type="success",
        )
        cls.send_user_update_leads_profile_notification(user)
        return notification

    @classmethod
    def send_user_update_leads_profile_notification(cls, user):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "notifications",  # Sending to the 'executives' channel
            {
                "type": "send.notification",
                "message": f"The user {user.username} with email {user.email} updated his profiel at {current_time}",
            },
        )
