from channels.generic.websocket import WebsocketConsumer
import json
from asgiref.sync import async_to_sync


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        # Access the user from self.scope
        user = self.scope.get("user", None)

        print("USUARIO AUTHENTICATED:", user.id)
        self.room_group_name = f"user_{user.id}"
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name,
        )
        self.accept()
        self.send(
            text_data=json.dumps(
                {
                    "type": "connection_established",
                    "message": "You are now connected",
                }
            )
        )

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name,
        )

    def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)

        except json.JSONDecoderError:
            self.send(text_data=json.dumps({"error": "Invalid JSON format"}))
            return
        message = text_data_json.get("message", "")
        action = text_data_json.get("action")

        if action == "ping":
            self.send(text_data=json.dumps({"type": "chat", "message": "pong"}))
            return

        if isinstance(message, str):
            try:
                message = json.loads(message)
            except json.JSONDecodeError:
                message = {"action": "text", "content": message}

        if message:

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "message": (
                        message
                        if isinstance(message, dict)
                        else {"action": "text", "content": str(message)}
                    ),
                },
            )

    def chat_message(self, event):
        message = event["message"]
        if isinstance(message, dict) and message.get("action") == "text":
            content = message.get("content", "")

            self.send(
                text_data=json.dumps(
                    {
                        "type": "chat",
                        "message": content,
                    }
                )
            )
        else:
            self.send(
                text_data=json.dumps(
                    {
                        "type": "chat",
                        "message": message,
                    }
                )
            )

    def send_notification(self, event):
        self.send(
            text_data=json.dumps(
                {
                    "type": "notification",
                    "message": event["message"],
                }
            )
        )
