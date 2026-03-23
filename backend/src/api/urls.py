from rest_framework import routers
from django.urls import path, include

from .views import BoatViewSet, EquipmentViewSet


router = routers.DefaultRouter()
router.register(r"boats", BoatViewSet)
router.register(r"equipments", EquipmentViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
