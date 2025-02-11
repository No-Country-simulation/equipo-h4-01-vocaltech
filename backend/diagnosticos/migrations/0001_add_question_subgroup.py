from django.db import migrations, models

def create_default_subgroup(apps, schema_editor):
    QuestionSubGroup = apps.get_model("diagnosticos", "QuestionSubGroup")
    Question = apps.get_model("diagnosticos", "Question")
    QuestionGroup = apps.get_model("diagnosticos", "QuestionGroup")

    # Crear un subgrupo por defecto para cada grupo existente
    for group in QuestionGroup.objects.all():
        sub_group, created = QuestionSubGroup.objects.get_or_create(
            name="Subgrupo por defecto",
            group=group
        )

        # Asignar el subgrupo a todas las preguntas sin subgrupo
        Question.objects.filter(sub_group__isnull=True, group=group).update(sub_group=sub_group)

class Migration(migrations.Migration):


    operations = [
        migrations.CreateModel(
            name='QuestionSubGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('group', models.ForeignKey(on_delete=models.CASCADE, to='diagnosticos.QuestionGroup')),
            ],
        ),
        migrations.RunPython(create_default_subgroup),
    ]
