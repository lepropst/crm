# Generated by Django 3.2.16 on 2022-12-01 00:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('unendlich', '0003_rename_name_todolist_label'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='description',
            field=models.CharField(default='', max_length=10000),
            preserve_default=False,
        ),
    ]
