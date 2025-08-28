from django.contrib import admin
from .models import Medicine


@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "cantidad", "fecha_expiracion", "creado", "actualizado")
    search_fields = ("nombre", "descripcion")
    list_filter = ("fecha_expiracion", "creado")
    ordering = ("nombre",)
    