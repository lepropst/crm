from django.contrib import admin
from .models import Todo, TodoList, Note, NoteBook

# Register your models here.


admin.site.register(Note)
admin.site.register(NoteBook)

admin.site.register(Todo)
admin.site.register(TodoList)
