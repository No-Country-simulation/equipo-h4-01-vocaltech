from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.db.models.query import QuerySet
from django.http import Http404


class AbstractSoftDeleteManager(models.Manager):
    def get_queryset(self) -> QuerySet:
        return super().get_queryset().filter(is_active=True)


class AbstractManager(models.Manager):
    def get_object_by_id_and_is_active(self, id):
        try:
            instance = self.get(id=id, is_active=True)
            return instance
        except (ObjectDoesNotExist, ValueError, TypeError):
            return Http404


class AbstractModel(models.Model):
    notes = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    objects = AbstractManager()
    active_objects = AbstractSoftDeleteManager()

    def soft_delete(self):
        self.is_active = False
        self.save()

    def restore(self):
        self.is_active = True
        self.save()

    class Meta:
        abstract = True

    def __repr__(self):
        return f"<{self.__class__.__name__} {self.id}>"
