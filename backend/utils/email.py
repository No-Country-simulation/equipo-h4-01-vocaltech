from django.conf import settings
from django.core.mail import send_mail
from django.utils.html import strip_tags
from django.template.loader import render_to_string
from django.core.mail import BadHeaderError
import smtplib
from auth_service.models import User

class Email:
    @staticmethod
    def enviar_email_cita(lead, fecha, hora_inicio):
        asunto = "Cita agendada"
        contexto = {
            'lead': lead,
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
    def enviar_email_diagnotico(user_id, recommendations):
        try:
            user = User.objects.get(id=user_id)
            subject = "Resultados de tu diagnóstico en vocaltech"
            
            # Renderizar la plantilla HTML
            context = {
                "user": user,
                "recommendations": recommendations,
            }
            html_message = render_to_string("email/email_diagnostico.html", context)
            plain_message = strip_tags(html_message)  # Versión en texto plano
            
            # Enviar correo
            send_mail(
                subject,
                plain_message,
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                html_message=html_message,
            )
            
            print(f"Correo enviado a {user.email}")
        except User.DoesNotExist:
            print("Error: Usuario no encontrado")
        except Exception as e:
            print(f"Error al enviar el correo: {e}")

