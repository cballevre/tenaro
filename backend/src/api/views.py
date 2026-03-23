from rest_framework import viewsets

from .models import Boat, Equipment
from .serializers import BoatSerializer, EquipmentSerializer


class BoatViewSet(viewsets.ModelViewSet):
    queryset = Boat.objects.all()
    serializer_class = BoatSerializer


class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
