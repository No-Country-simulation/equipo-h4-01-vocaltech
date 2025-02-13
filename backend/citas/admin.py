from django import forms
from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Cita

class CitasAdmin(ModelAdmin):
    list_display = ['get_lead_full_name', 'get_especialista_full_name', 'fecha', 'hora_inicio', 'hora_fin', 'motivo', 'estado']
    search_fields = ['motivo', 'estado', 'lead__first_name', 'lead__last_name', 'especialista__first_name', 'especialista__last_name']
    list_filter = ['estado']
    fieldsets = (
        ("Información de la Cita", {
            "fields": ("fecha", "hora_inicio", "hora_fin", "motivo"),
        }),
        ("Detalles del Usuario", {
            "fields": ("lead", "especialista", "estado"),
        }),
    )
    autocomplete_fields = ["lead", "especialista"]  # ⬅️ Muestra nombres en lugar de username

    def get_lead_full_name(self, obj):
        return f"{obj.lead.first_name} {obj.lead.last_name}"
    get_lead_full_name.short_description = "Lead"

    def get_especialista_full_name(self, obj):
        return f"{obj.especialista.first_name} {obj.especialista.last_name}"
    get_especialista_full_name.short_description = "Especialista"

admin.site.register(Cita, CitasAdmin)
