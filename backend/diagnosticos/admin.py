from django.contrib import admin
from unfold.admin import ModelAdmin
from django import forms
from django.utils.html import format_html
from .models import SurveyResponse, LeadEmprendimiento
from .forms import SurveyResponseForm


class LeadEmprendimientoAdmin(ModelAdmin):
    list_display = ['nombre', 'ubicacion', 'sector', 'años', 'empleados']
    search_fields = ['nombre', 'ubicacion', 'sector']
    list_filter = ['años', 'empleados']


class SurveyResponseAdmin(ModelAdmin):
    form = SurveyResponseForm
    list_display = ['user', 'created_at']
    search_fields = ['user__username', 'user__email']
    list_filter = ['created_at']

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return ['responses', 'recommendations']
        return []

    def change_view(self, request, object_id, form_url='', extra_context=None):
        survey_response = self.get_object(request, object_id)
        if survey_response:
            extra_context = extra_context or {}
            extra_context['responses'] = format_html(survey_response.get_responses())
            extra_context['recommendations'] = format_html(survey_response.get_recommendations())
        return super().change_view(request, object_id, form_url, extra_context=extra_context)

    def response_change(self, request, obj):
        if "_save" in request.POST:
            self.message_user(request, "SurveyResponse updated successfully.")
        return super().response_change(request, obj)

admin.site.register(LeadEmprendimiento, LeadEmprendimientoAdmin)
admin.site.register(SurveyResponse, SurveyResponseAdmin)