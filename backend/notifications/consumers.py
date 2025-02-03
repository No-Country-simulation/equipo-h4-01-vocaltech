from channels.generic.websocket import AsyncWebsocketConsumer
import json


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add(
            "notifications", self.channel_name  # Group name must match sender
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("notifications", self.channel_name)

    def receive(self, text_data):
        pass

    async def send_notification(self, event):
        message = event["message"]
        await self.send(
            text_data=json.dumps(
                {
                    "type": "notification",
                    "message": message,
                }
            )
        )
