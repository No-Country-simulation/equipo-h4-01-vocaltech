from django.db import models
from auth_service.models import Role

QUESTION_TYPES = [
    ('textarea', 'Texto'),
    ('radio', 'Opción única'),
    ('rating1', 'Escala 1'),
    ('rating2', 'Escala 2'),
]

class Service(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    client_type = models.ManyToManyField(Role, related_name='services')

    def __str__(self):
        return self.name

class QuestionGroup(models.Model):
    name = models.CharField(max_length=255)
    client_type = models.ForeignKey(Role, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} ({self.client_type})"

class QuestionSubGroup(models.Model):
    name = models.CharField(max_length=255)
    group = models.ForeignKey(QuestionGroup, related_name="subgroups", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} ({self.group})"

class Question(models.Model):
    group = models.ForeignKey(QuestionGroup, related_name="questions", on_delete=models.CASCADE)
    sub_group = models.ForeignKey(QuestionSubGroup, related_name="questions", on_delete=models.CASCADE, default=1)
    text = models.TextField()
    question_type = models.CharField(max_length=50, choices=QUESTION_TYPES)

    def __str__(self):
        return self.text

class AnswerOption(models.Model):
    question = models.ForeignKey(Question, related_name="options", on_delete=models.CASCADE)
    text = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.question.text} - {self.text}"

class Recommendation(models.Model):
    answer_options = models.ManyToManyField(AnswerOption, related_name="recommendations")
    text = models.TextField()

    def __str__(self):
        return f"Recomendación: {self.text}"