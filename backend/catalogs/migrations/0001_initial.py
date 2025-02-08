# Generated by Django 5.1.5 on 2025-02-07 21:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Nationality',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=50)),
                ('nom', models.CharField(max_length=50)),
                ('iso2', models.CharField(max_length=2)),
                ('iso3', models.CharField(max_length=3)),
                ('phone_code', models.CharField(max_length=5)),
            ],
            options={
                'verbose_name': 'Nationality',
                'verbose_name_plural': 'Nationalities',
                'db_table': 'nationalities',
                'ordering': ['-name'],
            },
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=70)),
                ('nationality', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='nationality', to='catalogs.nationality')),
            ],
            options={
                'verbose_name': 'State',
                'verbose_name_plural': 'States',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('state', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='catalogs.state')),
            ],
            options={
                'verbose_name': 'City',
                'verbose_name_plural': 'Cities',
                'ordering': ['state', 'name'],
            },
        ),
    ]
