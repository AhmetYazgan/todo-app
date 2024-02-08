from rest_framework import serializers
from .models import Todo
from django.contrib.auth.models import User  # Import the User model

class TodoSerializer(serializers.ModelSerializer):
  user = serializers.PrimaryKeyRelatedField(
    default=serializers.CurrentUserDefault(),
    read_only=True
  )
  
  class Meta:
    model = Todo
    fields = (
      'id',
      'user',
      'task',
      'description',
      'is_done',
      'updated_date',
      'created_date'
    )

  def create(self, validated_data):
    validated_data['user'] = self.context['request'].user
    return super().create(validated_data)
