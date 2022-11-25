import datetime
from django.db import models

ACTIVE = "ACTIVE"
PAST = "PAST"
PROSPECTIVE = "PROSPECTIVE"

STATUS_CHOICES = (
    (ACTIVE, "ACTIVE"),
    (PAST, "PAST"),
    (PROSPECTIVE, "PROSPECTIVE")
)
# Create your models here.


class Account(models.Model):
    title = models.CharField(max_length=200)
    created = models.DateTimeField()
    status = models.CharField(
        max_length=100, choices=STATUS_CHOICES, default=PROSPECTIVE)
    contact_info = models.CharField(max_length=12000)


class Task(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=12000)
    account = models.ForeignKey(
        Account, related_name="tasks", on_delete=models.CASCADE)
