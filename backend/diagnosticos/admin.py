from django.contrib import admin
from django import forms
from markdown2 import markdown
from django.utils.safestring import mark_safe
from django.urls import path
from .models import Question, Service, QuestionGroup, SurveyResponse, LeadEmprendimiento

class QuestionForm(forms.ModelForm):
    options_input = forms.CharField(widget=forms.Textarea, required=False, help_text="Ingrese las opciones separadas por salto de línea. Use ':' para separar la opción de su valoración.")

    class Meta:
        model = Question
        fields = ['group', 'text', 'question_type', 'services', 'options', 'weight', 'category']

    def clean(self):
        cleaned_data = super().clean()
        question_type = cleaned_data.get('question_type')
        options_input = cleaned_data.get('options_input')

        if question_type in ['radio', 'checkbox', 'yes_no'] and not options_input:
            raise forms.ValidationError('Las preguntas de tipo opción única, múltiples opciones o sí/no deben tener opciones.')

        if question_type in ['text', 'number'] and options_input:
            raise forms.ValidationError(f'Las preguntas de tipo {question_type} no pueden tener opciones.')

        return cleaned_data

    def save(self, commit=True):
        question = super().save(commit=False)
        options_input = self.cleaned_data.get('options_input')

        if options_input:
            options = []
            for line in options_input.splitlines():
                if ':' in line:
                    text, value = line.split(':', 1)
                    options.append({'text': text.strip(), 'value': value.strip()})
                else:
                    options.append({'text': line.strip(), 'value': line.strip()})
            question.options = options

        if commit:
            question.save()
            self.save_m2m()
        return question

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
    list_display = ['lead', 'created_at']
    search_fields = ['lead__username', 'lead__email']
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