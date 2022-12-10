
# Create your views here.
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions

from .serializers import TodoSerializer, NoteBookSerializer, NoteSerializer, TodoListSerializer, TodoListSerializerWithoutTodos, TodoListSerializerWithHyperlinks
from .models import Todo, Note, NoteBook, TodoList


class NoteBookViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated]
    queryset = NoteBook.objects.all().order_by('label')
    serializer_class = NoteBookSerializer


class NoteViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated]
    queryset = Note.objects.all().order_by('label')
    serializer_class = NoteSerializer


class TodoListViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated]
    queryset = TodoList.objects.all().order_by('label')
    serializer_class = TodoListSerializer


class TodoViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated]
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class TodoListSerializerWithoutTodosViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated]
    queryset = TodoList.objects.all().order_by('label')
    serializer_class = TodoListSerializerWithoutTodos


class TodoListSerializerWithHyperlinksViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated]
    queryset = TodoList.objects.all().order_by('label')
    serializer_class = TodoListSerializerWithHyperlinks
