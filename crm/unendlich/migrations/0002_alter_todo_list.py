# Generated by Django 3.2.16 on 2022-11-25 01:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('unendlich', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='list',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='todos', to='unendlich.todolist'),
        ),
    ]