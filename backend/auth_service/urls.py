from rest_framework.routers import DefaultRouter
from auth_service.viewsets.users import UserRegistrationViewSet, LoginViewSet


router = DefaultRouter()
router.register(r"register", UserRegistrationViewSet, basename="user-register")
urlpatterns = [] + router.urls

router.register(r"login", LoginViewSet, basename="user-login")
urlpatterns = [] + router.urls
