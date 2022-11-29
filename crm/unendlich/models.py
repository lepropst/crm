
from django.contrib.postgres.fields import ArrayField
from django.db import models

# Create your models here.


class NoteBook(models.Model):
    label = models.CharField(max_length=100)
    dateEdited = models.CharField(max_length=50)

    def __str__(self):
        return self.label


class Note(models.Model):
    notebook = models.ForeignKey(
        NoteBook, related_name="notes", on_delete=models.CASCADE)
    label = models.CharField(max_length=100)
    dateEdited = models.CharField(max_length=50)
    content = ArrayField(base_field=models.TextField(
        null=True), default=list, blank=True)

    def __str__(self):
        return self.label


class TodoList(models.Model):
    label = models.CharField(max_length=200)

    def __str__(self):
        return self.label


class Todo(models.Model):
    list = models.ForeignKey(TodoList, related_name="todos",
                             on_delete=models.CASCADE, default=0)
    label = models.CharField(max_length=500)
    dateDue = models.DateTimeField()
    description = models.CharField()

    def __stsr__(self):
        return self.label
