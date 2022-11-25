
# Create your views here.
from rest_framework import viewsets

from .serializers import TodoSerializer, NoteBookSerializer, NoteSerializer

from .models import Todo, Note, NoteBook


class NoteBookViewSet(viewsets.ModelViewSet):
    queryset = NoteBook.objects.all().order_by('label')
    serializer_class = NoteBookSerializer


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all().order_by('label')
    serializer_class = NoteSerializer


class TodoListViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('label')
    serializer_class = TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('label')
    serializer_class = TodoSerializer
