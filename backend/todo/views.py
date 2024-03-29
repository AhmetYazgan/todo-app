from rest_framework import viewsets, permissions
from .models import Todo
from .serializers import TodoSerializer

class TodoViewSet(viewsets.ModelViewSet):
  serializer_class = TodoSerializer
  permission_classes = [permissions.IsAuthenticated]

  def get_queryset(self):
    # Filter tasks based on the logged-in user
    return Todo.objects.filter(user=self.request.user)

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)
