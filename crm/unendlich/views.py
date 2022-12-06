
# Create your views here.
from rest_framework import viewsets, permissions

from .serializers import TodoSerializer, NoteBookSerializer, NoteSerializer, TodoListSerializer

from .models import Todo, Note, NoteBook, TodoList


class NoteBookViewSet(viewsets.ModelViewSet):
    permission_classes = [

        permissions.IsAuthenticated]
    queryset = NoteBook.objects.all().order_by('label')
    serializer_class = NoteBookSerializer

    def get_queryset(self):
        return self.request.user.notebooks.all()


class NoteViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated]
    queryset = Note.objects.all().order_by('label')
    serializer_class = NoteSerializer

    def get_queryset(self):
        return self.request.user.notes.all()


class TodoListViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated]
    queryset = TodoList.objects.all().order_by('label')
    serializer_class = TodoListSerializer

    def get_queryset(self):
        return self.request.user.lists.all()


class TodoViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated]
    queryset = Todo.objects.all().order_by('label')
    serializer_class = TodoSerializer

    def get_queryset(self):
        return self.request.user.todos.all()
