from django.forms import CharField
from rest_framework import serializers


from .models import Todo, Note, NoteBook


class NoteSerializer(serializers.ModelSerializer):
    content = serializers.ListField(child=serializers.CharField(
        max_length=10000, allow_blank=True), allow_empty=True)

    class Meta:
        model = Note
        fields = ['id', 'notebook', 'label', 'dateEdited', 'content']


class NoteBookSerializer(serializers.ModelSerializer):
    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = NoteBook
        fields = ('id', 'label', 'notes', 'dateEdited')


class NoteBookWithoutNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteBook
        fields = ('id', 'label', 'dateEdited')


class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = "__all__"


class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = "__all__"
