from django.http import HttpResponse
from rest_framework import viewsets


from .models import Account, Task
from .serializers import AccountSerializer, TaskSerializer

# Create your views here.


def index(request):
    return HttpResponse("Hello update 1")


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all().order_by("created")
    serializer_class = AccountSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by("title")
    serializer_class = TaskSerializer
