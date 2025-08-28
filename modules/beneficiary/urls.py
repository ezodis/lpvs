from django.urls import path
from .views import list_beneficiaries, create_beneficiary

urlpatterns = [
    path('', list_beneficiaries, name='list_beneficiaries'),
    path('create/', create_beneficiary, name='create_beneficiary'),
]