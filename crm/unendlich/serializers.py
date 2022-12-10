from django.forms import CharField
from rest_framework import serializers


from .models import Todo, Note, NoteBook, TodoList


class NoteSerializer(serializers.ModelSerializer):
    content = serializers.ListField(child=serializers.CharField(
        max_length=10000, allow_blank=True), allow_empty=True)

    class Meta:
        model = Note
        fields = ['id', 'notebook', 'label', 'dateEdited', 'content', 'owner']


class NoteBookSerializer(serializers.ModelSerializer):
    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = NoteBook
        fields = ('id', 'label', 'notes', 'dateEdited', 'owner')


class NoteBookWithoutNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteBook
        fields = ('id', 'label', 'dateEdited', 'owner')


class TodoListSerializerWithoutTodos(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = "__all__"


class TodoListSerializerWithHyperlinks(serializers.ModelSerializer):
    todos = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='todo-detail'
    )

    class Meta:
        model = TodoList
        fields = "__all__"


class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = "__all__"


class TodoListSerializer(serializers.ModelSerializer):
    todos = TodoSerializer(many=True, read_only=True)

    class Meta:
        model = TodoList
        fields = "__all__"
