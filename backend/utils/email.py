from django.conf import settings
from django.core.mail import send_mail
from django.utils.html import strip_tags
from django.template.loader import render_to_string
from django.core.mail import BadHeaderError
import smtplib

class Email:
    @staticmethod
    def enviar_email_cita(lead, especialista, fecha, hora_inicio):
        asunto = "Cita agendada"
        contexto = {
            'lead': lead,
            'especialista': especialista,
            'fecha': fecha,
            'hora_inicio': hora_inicio
        }
    
        mensaje_html = render_to_string("email/email_cita.html", contexto)
        mensaje_texto = strip_tags(mensaje_html)  # Para clientes que no soportan HTML

        send_mail(
            asunto,
            mensaje_texto,
            settings.EMAIL_HOST_USER,
            [lead.email],
            html_message=mensaje_html
        )

    @staticmethod
    def enviar_email_diagnotico(lead, especialista, fecha, hora_inicio):
        asunto = "Diagnóstico de cita"
        contexto = {
            'lead': lead,
            'especialista': especialista,
            'fecha': fecha,
            'hora_inicio': hora_inicio
        }
    
        mensaje_html = render_to_string("email/email_diagnostico.html", contexto)
        mensaje_texto = strip_tags(mensaje_html)

        send_mail(
            asunto,
            mensaje_texto,
            settings.EMAIL_HOST_USER,
            [especialista.email],
            html_message=mensaje_html
        )
