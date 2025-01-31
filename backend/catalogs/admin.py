from django.contrib import admin
from catalogs.models.nationalities import Nationality
from .models.states import State
from .models.cities import City
from import_export.admin import ImportExportModelAdmin

# Register your models here.


@admin.register(Nationality)
class NationalityAdmin(ImportExportModelAdmin):
    pass


@admin.register(State)
class StateAdmin(ImportExportModelAdmin):
    pass


@admin.register(City)
class CityAdmin(ImportExportModelAdmin):
    pass
