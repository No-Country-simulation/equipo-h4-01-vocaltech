# Generated by Django 5.1.5 on 2025-02-07 18:42

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Cita',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField()),
                ('hora_inicio', models.TimeField()),
                ('hora_fin', models.TimeField()),
                ('motivo', models.CharField(max_length=100)),
                ('estado', models.CharField(choices=[('AG', 'Agendada'), ('CO', 'Confirmada'), ('CM', 'Completada'), ('CA', 'Cancelada')], default='AG', max_length=2)),
                ('especialista', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='citas_asignadas', to=settings.AUTH_USER_MODEL)),
                ('lead', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='citas', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'citas',
                'managed': True,
            },
        ),
    ]
