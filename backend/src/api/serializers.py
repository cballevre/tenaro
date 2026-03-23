from rest_framework import serializers

from .models import Boat


class BoatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boat
        fields = "__all__"
        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )
