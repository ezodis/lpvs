from rest_framework import serializers
from .models import Beneficiary

class BeneficiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Beneficiary
        fields = "__all__"
        extra_kwargs = {
            "documentos": {"required": False},
            "fecha_registro": {"read_only": True},  # auto-filled by model
        }
        