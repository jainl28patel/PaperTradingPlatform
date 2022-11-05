from django.db import models

# Create your models here.

class UserDetail(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    username = models.CharField(max_length=100)
    jwt_token = models.CharField(max_length=400)

    def __str__(self):
        return self.username