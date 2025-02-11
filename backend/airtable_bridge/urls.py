from rest_framework.routers import DefaultRouter
from airtable_bridge.viewsets.notifications import AirTableExportViewSet
from airtable_bridge.viewsets.roles import AirTableExportRoleViewSet
from airtable_bridge.viewsets.users import AirTableExportUserViewSet

router = DefaultRouter()
router.register(
    r"bridge-airtable", AirTableExportViewSet, basename="export-notifications"
)
router.register(r"bridge-airtable", AirTableExportRoleViewSet, basename="export-roles")
router.register(r"bridge-airtable", AirTableExportUserViewSet, basename="export-users")
urlpatterns = [] + router.urls
