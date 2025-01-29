from rest_framework.routers import DefaultRouter
from catalogs.viewsets.nationalities import NationalityViewSet
from catalogs.viewsets.states import StateViewSet
from catalogs.viewsets.cities import CityViewSet

router = DefaultRouter()
router.register(r"nationalities", NationalityViewSet, basename="nationality")
router.register(r"states", StateViewSet, basename="state")
router.register(r"cities", CityViewSet, basename="city")
urlpatterns = [] + router.urls
