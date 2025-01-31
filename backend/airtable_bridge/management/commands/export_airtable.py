from django.core.management.base import BaseCommand
from pyairtable import Api
from notifications.models.notifications import Notification
import os


class Command(BaseCommand):
    help = "Export notifications from Django to AirTable"

    def add_arguments(self, parser):
        parser.add_argument("--base_id", type=str, help="AirTable Table Name")
        parser.add_argument("--table_name", type=str, help="AirTable Name")

    def handle(self, *args, **options):
        token = os.environ.get("AIRTABLE_TOKEN")
        base_id = options["base_id"]
        table_name = options["table_name"]

        if not token:
            self.stdout.write(
                self.style.ERROR("AIRTABLE_TOKEN not found in environment")
            )
            return
        try:
            api = Api(token)
            table = api.table(base_id, table_name)
            field_mapping = {
                "user_id": "user",
                "message": "message",
                "notification_type": "notification_type",
                "is_read": "is_read",
            }
            notifications = Notification.objects.all()
            airtable_records = []
            for notification in notifications:
                record = {
                    "user": notification.user_id,
                    "message": notification.message,
                    "notification_type": notification.notification_type,
                    "is_read": notification.is_read,
                }
                airtable_records.append(record)
            table.batch_create(airtable_records)
            self.stdout.write(
                self.style.SUCCESS(
                    f"Successfully exported {len(airtable_records)} notifications"
                )
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f"Error exporting data: {str(e)}"),
            )
