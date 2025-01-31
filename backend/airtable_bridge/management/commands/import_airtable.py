import os
from django.core.management.base import BaseCommand
from pyairtable import Api


class Command(BaseCommand):
    help = "Import data from AirTable"

    def add_arguments(self, parser):
        parser.add_argument("--base_id", type=str, help="AirTable Base ID")
        parser.add_argument("--table_name", type=str, help="AirTable Name")

    def handle(self, *args, **options):
        token = os.environ.get("AIRTABLE_TOKEN")
        base_id = options["base_id"]
        table_name = options["table_name"]

        if not token:
            self.stdout.write(self.style.ERROR("AirTable token not found"))
            return
        try:
            api = Api(token)
            table = api.table(base_id, table_name)
            print("TABLA", table)
            for record in table.all():
                print("RECORD", record["fields"])
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error importing data: {str(e)}"))
