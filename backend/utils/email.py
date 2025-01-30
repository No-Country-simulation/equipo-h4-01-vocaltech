from django.conf import settings
from django.core.mail import send_mail
from django.utils.html import strip_tags
from django.template.loader import render_to_string
from django.core.mail import BadHeaderError
import smtplib

class Email:
    @staticmethod
    def send_email(subject, template, context, to_email):
        try:
            html_message = render_to_string(template, context)
            plain_message = strip_tags(html_message)
            from_email = settings.DEFAULT_FROM_EMAIL
            send_mail(
                subject,
                plain_message,
                from_email,
                [to_email],
                html_message=html_message,
                fail_silently=False,
            )
        except BadHeaderError:
            print("Invalid header found.")
        except smtplib.SMTPException as e:
            print(f"SMTP error occurred: {e}")
        except Exception as e:
            print(f"An error occurred: {e}")
