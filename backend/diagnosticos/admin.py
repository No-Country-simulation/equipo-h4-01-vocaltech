from django.contrib import admin
from django import forms
from django.contrib.admin.widgets import FilteredSelectMultiple
from .models import Question, AnswerOption, Recommendation, Service, QuestionGroup, SurveyResponse, LeadEmprendimiento


class RecommendationAdminForm(forms.ModelForm):
    class Meta:
        model = Recommendation
        fields = "__all__"

    answer_options = forms.ModelMultipleChoiceField(
        queryset=AnswerOption.objects.all(),
        widget=FilteredSelectMultiple("Answer Options", is_stacked=False)
    )


@admin.register(Recommendation)
class RecommendationAdmin(admin.ModelAdmin):
    form = RecommendationAdminForm
    exclude = ["answer_option"]
    list_display = ["text"]

class OptionInline(admin.TabularInline):
    model = AnswerOption
    extra = 0  # Permite agregar varias opciones dentro de la pregunta

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [OptionInline]  # Solo permitimos agregar opciones en la creación de preguntas
    list_display = ['text', 'question_type', 'group']
    search_fields = ['text']

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
    search_fields = ['name', 'description']
    list_filter = ['client_type']

@admin.register(QuestionGroup)
class QuestionGroupAdmin(admin.ModelAdmin):
    list_display = ['name', 'client_type']
    search_fields = ['name', 'client_type__name']
    list_filter = ['client_type']

@admin.register(SurveyResponse)
class SurveyResponseAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at']
    search_fields = ['user__username', 'user__email']
    list_filter = ['created_at']

@admin.register(LeadEmprendimiento)
class LeadEmprendimientoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'ubicacion', 'sector', 'años', 'empleados']
    search_fields = ['nombre', 'ubicacion', 'sector']
    list_filter = ['años', 'empleados']
