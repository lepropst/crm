from rest_framework import serializers
from .models import Account, Task, STATUS_CHOICES, PROSPECTIVE


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            "id",
            "created",
            "title",
            "description",
            "account",
        ]


class AccountSerializer(serializers.ModelSerializer):
    tasks = serializers.PrimaryKeyRelatedField(
        many=True, read_only=False, queryset=Account.objects.all())

    class Meta:
        model = Account
        fields = (
            "id",
            "created",
            "title",
            "status",
            "contact_info",
            "tasks"
        )
