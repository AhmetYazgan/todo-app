from django.urls import path, include
from rest_framework import routers
from .views import TodoViewSet

router = routers.DefaultRouter()

# Register the viewsets with the router
router.register('todos', TodoViewSet, basename='todo')

urlpatterns = [
  # Include the router's URLs by adding this line
  path('', include(router.urls)),
]
