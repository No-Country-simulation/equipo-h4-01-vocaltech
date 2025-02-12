from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from import_export.admin import ImportExportModelAdmin
from .models import User, Role, LeadsProfile

from .forms import UserCreationForm, UserChangeForm

from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm
from unfold.admin import ModelAdmin


class RoleAdmin(ModelAdmin, ImportExportModelAdmin):
    pass


class UserAdmin(BaseUserAdmin, ModelAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = (
        "email",
        "username",
        "role",
        "is_staff",
        "is_active",
        "exported_to_airtable",
    )
    list_filter = ("is_staff", "is_active")
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "email",
                    "username",
                    "password",
                    "role",
                    "exported_to_airtable",
                )
            },
        ),
        ("Permissions", {"fields": ("is_staff", "is_active")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "first_name",
                    "last_name",
                    "email",
                    "username",
                    "password1",
                    "password2",
                    "role",
                    "exported_to_airtable",
                ),
            },
        ),
    )
    search_fields = ("email", "username")
    ordering = ("email",)
    filter_horizontal = ()



class LeadsProfileAdmin(ModelAdmin, ImportExportModelAdmin):
    pass


admin.site.register(User, UserAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(LeadsProfile, LeadsProfileAdmin)
