from django.db import models
from auth_service.models.users import User


# Create your models here.
class Conversation(models.Model):
    user = models.ForeignKey(
        User,
        related_name="conversations",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.created_at)


class Message(models.Model):
    conversation = models.ForeignKey(
        Conversation, related_name="messages", on_delete=models.CASCADE
    )
    content = models.TextField()
    is_bot = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return str(self.conversation)
