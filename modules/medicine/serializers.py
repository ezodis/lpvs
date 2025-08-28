from rest_framework import serializers
from .models import Medicine


class MedicineSerializer(serializers.ModelSerializer):
    # Mapeo a camelCase para el frontend
    fechaExpiracion = serializers.DateField(source="fecha_expiracion")
    creadoEn = serializers.DateTimeField(source="creado", read_only=True)
    actualizadoEn = serializers.DateTimeField(source="actualizado", read_only=True)

    class Meta:
        model = Medicine
        fields = [
            "id",
            "nombre",
            "descripcion",
            "cantidad",
            "fechaExpiracion",
            "creadoEn",
            "actualizadoEn",
        ]
        