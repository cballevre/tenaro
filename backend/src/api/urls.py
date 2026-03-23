from rest_framework import routers
from django.urls import path, include

from .views import BoatViewSet


router = routers.DefaultRouter()
router.register(r"boats", BoatViewSet)

urlpatterns = [
    path('', include(router.urls)),
]