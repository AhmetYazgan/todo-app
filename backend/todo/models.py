from django.db import models
from django.contrib.auth.models import User  # Assuming you're using Django's built-in User model

class Todo(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  task = models.CharField(max_length=255)
  description = models.TextField(blank=True, null=True)
  is_done = models.BooleanField(default=False)
  updated_date = models.DateTimeField(auto_now=True)
  created_date = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.task
