import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth_service', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='LeadEmprendimiento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('ubicacion', models.CharField(max_length=100)),
                ('sector', models.CharField(max_length=100)),
                ('años', models.IntegerField()),
                ('empleados', models.IntegerField()),
                ('informacion', models.TextField()),
                ('audio', models.FileField(blank=True, null=True, upload_to='user_audios/')),
                ('lead', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='leads_emprendimiento', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SurveyResponse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('responses', models.JSONField()),
                ('recommendations', models.JSONField(default=list)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='survey_responses', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
