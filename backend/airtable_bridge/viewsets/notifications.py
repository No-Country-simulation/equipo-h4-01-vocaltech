import os
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from airtable_bridge.permissions import has_any_role_permission
from notifications.models.notifications import Notification
from ..utils import ExportToAirTable


class AirTableExportViewSet(viewsets.ViewSet):

    @action(
        detail=False,
        methods=["post"],
        permission_classes=[has_any_role_permission(["Administrador"])],
        url_path="export-notifications",
    )
    def export_to_airtable(self, request):
        token = os.environ.get("AIRTABLE_TOKEN")
        base_id = os.environ.get("BASE_ID")
        table_name = "notifications"

        field_mapping = {
            "user_id": "user",
            "message": "message",
            "notification_type": "notification_type",
            "is_read": "is_read",
        }
        queryset = Notification.objects.filter(exported_to_airtable=False)
        if not queryset.exists():
            return Response(
                {"message": "No new notifications to export"},
                status=status.HTTP_200_OK,
            )
        exporter = ExportToAirTable(
            token=token,
            base_id=base_id,
            table_name=table_name,
            queryset=queryset,
            field_mapping=field_mapping,
        )

        try:
            exporter()
            total_records_exported = len(queryset)
            queryset.update(exported_to_airtable=True)
            return Response(
                {
                    "success": "notifications exported succesfully",
                    "tuples": total_records_exported,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
