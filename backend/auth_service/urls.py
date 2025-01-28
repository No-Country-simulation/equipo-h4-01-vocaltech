from rest_framework.routers import DefaultRouter
from auth_service.viewsets.users import UserRegistrationViewSet, LoginViewSet
from auth_service.viewsets.leads_profile import LeadsProfileViewSet
from auth_service.viewsets.roles import RoleViewSet

router = DefaultRouter()
router.register(r"register", UserRegistrationViewSet, basename="user-register")
router.register(r"auth", LoginViewSet, basename="login")
router.register(r"leads-profile", LeadsProfileViewSet, basename="leads-profile")
router.register(r"roles", RoleViewSet, basename="role")
urlpatterns = router.urls
