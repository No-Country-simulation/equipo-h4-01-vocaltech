from django.contrib import admin
from django import forms
from django.contrib.admin.widgets import FilteredSelectMultiple
from .models import SurveyResponse, LeadEmprendimiento


@admin.register(LeadEmprendimiento)
class LeadEmprendimientoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'ubicacion', 'sector', 'años', 'empleados']
    search_fields = ['nombre', 'ubicacion', 'sector']
    list_filter = ['años', 'empleados']


@admin.register(SurveyResponse)
class SurveyResponseAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at']
    search_fields = ['user__username', 'user__email']
    list_filter = ['created_at']
