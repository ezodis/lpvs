from django.urls import path
from .views import list_medicines, create_medicine

urlpatterns = [
    path("", list_medicines, name="list_medicines"),
    path("create/", create_medicine, name="create_medicine"),
]
