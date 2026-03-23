from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


class Boat(models.Model):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="boats"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Equipment(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    brand = models.CharField(max_length=255, blank=True, null=True)
    model = models.CharField(max_length=255, blank=True, null=True)
    serial_number = models.CharField(max_length=255, blank=True, null=True)
    warranty_end_date = models.DateTimeField(blank=True, null=True)
    purchase_value = models.FloatField(blank=True, null=True)
    purchase_date = models.DateTimeField(blank=True, null=True)
    quantity = models.IntegerField(default=1)
    boat = models.ForeignKey(Boat, on_delete=models.CASCADE, related_name="equipments")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
