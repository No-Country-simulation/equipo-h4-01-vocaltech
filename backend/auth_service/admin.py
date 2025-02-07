from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from auth_service.models.users import User
from auth_service.models.roles import Role
from auth_service.models.leads_profile import LeadsProfile

# Register your models here.
admin.site.register(User)


class LeadsProfileAdmin(admin.ModelAdmin):
    list_display_name = ("user", "first_name", "last_name", "get_role")
    search_fields = ("first_name", "last_name", "user__email", "user__role__name")
    readonly_fields = ("get_role",)

    def get_role(self, obj):
        return obj.user.role.name if obj.user.role else "-"

    get_role.short_description = "Role"
    get_role.admin_order_field = "user__role"

    def get_model_perms(self, request):
        perms = super().get_model_perms(request)
        perms["add"] = False
        perms["delete"] = False
        return perms

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


admin.site.register(LeadsProfile, LeadsProfileAdmin)


@admin.register(Role)
class RoleAdmin(ImportExportModelAdmin):
    pass
