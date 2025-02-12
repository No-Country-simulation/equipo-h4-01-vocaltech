import logging
from pyairtable import Api
from django.db.models.query import QuerySet
from typing import Union, List, Dict

logger = logging.getLogger(__name__)


class ExportToAirTable:

    BASE_ID_LENGTH = 17

    def __init__(
        self,
        token: str,
        base_id: str,
        table_name: str,
        queryset: Union[QuerySet, List[Dict]],
        field_mapping: dict,
    ):
        self.token = token
        self.base_id = base_id
        self.table_name = table_name
        self.queryset = queryset
        self.field_mapping = field_mapping

    def __call__(self):
        self.base_id = self.base_id
        self.table_name = self.table_name

        # validate required values
        self._validate_inputs()

        # try to exporting to AirTable
        try:
            api = Api(self.token)
            table = api.table(self.base_id, self.table_name)
            airtable_records = self._prepare_records()
            table.batch_create(airtable_records)
            print("Successfully exported")

        except Exception as e:
            print(f"Error exporting to AirTable: {str(e)}")

    def _validate_inputs(self):
        if not self.token:
            logger.error("Api token is missing")
            return {"error": "Api token is required"}
        if not self.base_id:
            logger.error("Api base_id is missing")
            return {"error": "Api base_id is required"}
        if len(self.base_id) != self.BASE_ID_LENGTH:
            logger.error("Invalid base_id length")
            return {"error": "Base_id must be {self.BASE_ID_LENGTH} charecters long"}
        if not self.table_name:
            logger.error("Table name is missing")
            return {"error": "The table name is required"}
        if isinstance(self.queryset, QuerySet):
            if not self.queryset.exists():
                logger.warning("Query set is empty")
                return {"warning": "No records found in queryset"}
        if isinstance(self.queryset, List):
            if not self.queryset:
                logger.warning("Query set is empty")
                return {"warning": "No records found in queryset"}

        return None

    def _prepare_records(self):
        if isinstance(self.queryset, QuerySet):
            queryset_values = self.queryset.values(*self.field_mapping.keys())
            return [
                {
                    airtable_field: obj[model_field]
                    for model_field, airtable_field in self.field_mapping.items()
                }
                for obj in queryset_values
            ]
        elif isinstance(self.queryset, list):
            return [
                {
                    airtable_field: obj[model_field]
                    for model_field, airtable_field in self.field_mapping.items()
                }
                for obj in self.queryset
            ]
        else:
            raise TypeError("Queryset must be a list or a QuerySet")
