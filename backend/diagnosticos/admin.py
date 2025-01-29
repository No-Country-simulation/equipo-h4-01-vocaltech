from django.contrib import admin
from django import forms
from markdown2 import markdown
from django.utils.safestring import mark_safe
from django.urls import path
from .models import Question, Service, QuestionGroup, SurveyResponse, LeadEmprendimiento


class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ['group', 'text', 'question_type', 'services', 'options', 'weight', 'category']


class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
    search_fields = ['name', 'description']
    list_filter = ['client_type']

class QuestionGroupAdmin(admin.ModelAdmin):
    list_display = ['name', 'client_type']
    search_fields = ['name', 'client_type__name']
    list_filter = ['client_type']

class QuestionAdmin(admin.ModelAdmin):
    form = QuestionForm
    list_display = ['text', 'question_type', 'group', 'weight', 'category']
    search_fields = ['text', 'group__name', 'category']
    list_filter = ['question_type', 'group', 'category']

class SurveyResponseAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'created_at']
    search_fields = ['user_id__username', 'user_id__email']
    list_filter = ['created_at']
    readonly_fields = ['get_responses', 'get_recommendations']

    def get_responses(self, obj):
        return mark_safe(markdown(obj.get_responses()))
    get_responses.short_description = 'Responses'

    def get_recommendations(self, obj):
        return mark_safe(markdown(obj.get_recommendations()))
    get_recommendations.short_description = 'Recommendations'

    def has_add_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        if obj is not None:
            return False
        return super().has_change_permission(request, obj=obj)

    def has_delete_permission(self, request, obj=None):
        # Disable delete
        return False

class LeadEmprendimientoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'ubicacion', 'sector', 'años', 'empleados']
    search_fields = ['nombre', 'ubicacion', 'sector']
    list_filter = ['sector', 'años', 'empleados']

admin.site.register(Question, QuestionAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(QuestionGroup, QuestionGroupAdmin)
admin.site.register(SurveyResponse, SurveyResponseAdmin)
admin.site.register(LeadEmprendimiento, LeadEmprendimientoAdmin)