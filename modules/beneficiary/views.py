from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .models import Beneficiary
from .serializers import BeneficiarySerializer
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
@api_view(['POST'])
def create_beneficiary(request):
    serializer = BeneficiarySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    logger.error(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET'])
def list_beneficiaries(request):
    beneficiaries = Beneficiary.objects.all()
    serializer = BeneficiarySerializer(beneficiaries, many=True)
    return Response(serializer.data)
    