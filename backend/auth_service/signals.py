from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from auth_service.models import User
from .models.leads_profile import LeadsProfile


@receiver(pre_save, sender=User)
def update_leads_profile_from_user(sender, instance, **kwargs):
    """Updates existing LeadsProfile when User's email is updated"""
    try:
        if instance.pk:
            leads_profile = LeadsProfile.objects.get(user=instance)
            leads_profile.first_name = instance.first_name
            leads_profile.last_name = instance.last_name
            leads_profile.email = instance.email
            leads_profile.role = instance.role
            leads_profile.save()
    except LeadsProfile.DoesNotExist:
        pass


@receiver(post_save, sender=User)
def create_leads_profile(sender, instance, created, **kawargs):
    if created:
        LeadsProfile.objects.create(user=instance, email=instance.email)


@receiver(post_save, sender=User)
def save_leads_profile(sender, instance, **kwargs):
    instance.leads_profile.save()
