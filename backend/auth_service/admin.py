from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from auth_service.models.users import User
from auth_service.models.roles import Role

# Register your models here.
admin.site.register(User)


@admin.register(Role)
class RoleAdmin(ImportExportModelAdmin):
    pass
