# Generated by Django 5.1.5 on 2025-01-28 20:29

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth_service", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="LeadEmprendimiento",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nombre", models.CharField(max_length=100)),
                ("ubicacion", models.CharField(max_length=100)),
                ("sector", models.CharField(max_length=100)),
                ("años", models.IntegerField()),
                ("empleados", models.IntegerField()),
                ("informacion", models.TextField()),
                (
                    "audio",
                    models.FileField(blank=True, null=True, upload_to="user_audios/"),
                ),
                (
                    "lead",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="leads_emprendimiento",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="QuestionGroup",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                (
                    "client_type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="auth_service.role",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Service",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("description", models.TextField()),
                (
                    "client_type",
                    models.ManyToManyField(
                        related_name="services", to="auth_service.role"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Question",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("text", models.TextField(max_length=255)),
                (
                    "question_type",
                    models.CharField(
                        choices=[
                            ("text", "Texto"),
                            ("radio", "Opción única"),
                            ("checkbox", "Múltiples opciones"),
                            ("number", "Número"),
                            ("yes_no", "Sí/No"),
                        ],
                        max_length=20,
                    ),
                ),
                ("options", models.JSONField(default=list)),
                ("weight", models.FloatField(default=1.0)),
                ("category", models.CharField(blank=True, max_length=100, null=True)),
                (
                    "group",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="questions",
                        to="diagnosticos.questiongroup",
                    ),
                ),
                (
                    "services",
                    models.ManyToManyField(
                        blank=True, related_name="questions", to="diagnosticos.service"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="SurveyResponse",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("responses", models.JSONField()),
                ("recommendations", models.JSONField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "lead",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="survey_responses",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
