import os
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from auth_service.models.users import User
from ..utils import ExportToAirTable
from datetime import datetime
from pyairtable import Api
from airtable_bridge.permissions import has_any_role_permission


def convert_datetime_to_str(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()  # Converts datetime to ISO 8601 format
    return obj


def get_or_create_role(api, base_id, role_name):
    roles_table = api.table(base_id, "roles")
    records = roles_table.all(formula=f"{{name}} = '{role_name}'")
    if records:
        return records[0]["id"]
    else:
        record = roles_table.create({"mame": role_name})
        return record["id"]


class AirTableExportUserViewSet(viewsets.ViewSet):

    @action(
        detail=False,
        methods=["post"],
        permission_classes=[has_any_role_permission(["Administrador"])],
        url_path="export-users",
    )
    def export_user(self, request):
        token = os.environ.get("AIRTABLE_TOKEN")
        base_id = os.environ.get("BASE_ID")
        table_name = "users"

        field_mapping = {
            "first_name": "first_name",
            "last_name": "last_name",
            "username": "username",
            "email": "email",
            "is_active": "is_active",
            "is_staff": "is_staff",
            "date_joined": "date_joined",
            "role": "role",
            # "created": "created",
            # "updated": "updated",
        }
        queryset = User.objects.filter(exported_to_airtable=False)

        # queryset = User.objects.all()
        print("QUERY: ", queryset)
        if not queryset.exists():
            return Response(
                {"message": "No new Users to export"},
                status=status.HTTP_200_OK,
            )

        api = Api(token)
        serializer_data = []
        for obj in queryset:
            data = {}
            for field, airtable_field in field_mapping.items():
                value = getattr(obj, field, None)
                if field == "role" and value:
                    role_name = value.name
                    role_id = get_or_create_role(api, base_id, role_name)
                    data[airtable_field] = [role_id]
                else:
                    data[airtable_field] = convert_datetime_to_str(value)
            serializer_data.append(data)
        print("Field Mapping:", field_mapping)
        print("Serialized Data:", serializer_data)
        exporter = ExportToAirTable(
            token=token,
            base_id=base_id,
            table_name=table_name,
            queryset=serializer_data,
            field_mapping=field_mapping,
        )

        try:
            exporter()
            total_records_exported = len(queryset)
            queryset.update(exported_to_airtable=True)

            return Response(
                {
                    "success": "Users exported succesfully",
                    "tuples": total_records_exported,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
