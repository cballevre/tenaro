from rest_framework import routers
from django.urls import path, include

from .views import BoatViewSet, EquipmentViewSet, InterventionViewSet


router = routers.DefaultRouter()
router.register(r"boats", BoatViewSet)
router.register(r"equipments", EquipmentViewSet)
router.register(r"interventions", InterventionViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
