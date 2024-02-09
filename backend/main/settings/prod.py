from .base import *

DATABASES = {
  "default": {
    "ENGINE": "django.db.backends.postgresql_psycopg2",
    "NAME": config("POSTGRES_DATABASE"),
    "USER": config("POSTGRES_USER"),
    "PASSWORD": config("POSTGRES_PASSWORD"),
    "HOST": config("POSTGRES_HOST"),
    "PORT": config("POSTGRES_PORT"),
    "ATOMIC_REQUESTS": True,
  }
}