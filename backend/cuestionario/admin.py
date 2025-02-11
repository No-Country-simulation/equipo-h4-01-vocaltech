from django.contrib import admin
from unfold.admin import ModelAdmin
from unfold.admin import StackedInline, TabularInline
from django import forms
from django.contrib.admin.widgets import FilteredSelectMultiple
from .models import Recommendation, AnswerOption, Question, Service, QuestionGroup, QuestionSubGroup

class RecommendationAdminForm(forms.ModelForm):
    class Meta:
        model = Recommendation
        fields = ['text', 'answer_options']

    answer_options = forms.ModelMultipleChoiceField(
        queryset=AnswerOption.objects.all(),
        widget=FilteredSelectMultiple("Answer Options", is_stacked=False)
    )


class RecommendationAdmin(ModelAdmin):
    form = RecommendationAdminForm
    exclude = ["answer_option"]
    list_display = ["text"]

class OptionInline(TabularInline):
    model = AnswerOption
    extra = 0  # Permite agregar varias opciones dentro de la pregunta


class QuestionAdmin(ModelAdmin):
    inlines = [OptionInline]  # Solo permitimos agregar opciones en la creación de preguntas
    list_display = ['text', 'question_type', 'group']
    search_fields = ['text']


class QuestionSubGroupAdmin(ModelAdmin):
    list_display = ['name', 'group']
    search_fields = ['name', 'group__name']
    list_filter = ['group']


class ServiceAdmin(ModelAdmin):
    list_display = ['name', 'description']
    search_fields = ['name', 'description']
    list_filter = ['client_type']


class QuestionGroupAdmin(ModelAdmin):
    list_display = ['name', 'client_type']
    search_fields = ['name', 'client_type__name']
    list_filter = ['client_type']

admin.site.register(Recommendation, RecommendationAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(QuestionSubGroup, QuestionSubGroupAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(QuestionGroup, QuestionGroupAdmin)
