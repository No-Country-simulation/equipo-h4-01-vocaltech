import os
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from auth_service.models.roles import Role
from ..utils import ExportToAirTable
from datetime import datetime
from airtable_bridge.permissions import has_any_role_permission


def convert_datetime_to_str(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()  # Converts datetime to ISO 8601 format
    return obj


class AirTableExportRoleViewSet(viewsets.ViewSet):

    @action(
        detail=False,
        methods=["post"],
        permission_classes=[has_any_role_permission(["Administrador"])],
        url_path="export-roles",
    )
    def export_role(self, request):
        token = os.environ.get("AIRTABLE_TOKEN")
        base_id = os.environ.get("BASE_ID")
        table_name = "roles"

        field_mapping = {
            "name": "name",
            "notes": "notes",
            "is_active": "is_active",
            # "created": "created",
            # "updated": "updated",
        }
        queryset = Role.objects.filter(exported_to_airtable=False)
        if not queryset.exists():
            return Response(
                {"message": "No new Roles to export"},
                status=status.HTTP_200_OK,
            )

        serializer_data = []
        for obj in queryset:
            data = {}
            for field, airtable_field in field_mapping.items():
                value = getattr(obj, field, None)
                data[airtable_field] = convert_datetime_to_str(value)
            serializer_data.append(data)
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
                    "success": "Roles exported succesfully",
                    "tuples": total_records_exported,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
