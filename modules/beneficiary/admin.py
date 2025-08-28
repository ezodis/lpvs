from django.contrib import admin
from .models import Beneficiary

@admin.register(Beneficiary)
class BeneficiaryAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'fecha_registro', 'telefono', 'correo_electronico', 'direccion', 'tipo_cancer', 'genero', 'activa')
    search_fields = ('nombre', 'correo_electronico', 'telefono')
    list_filter = ('tipo_cancer', 'genero', 'activa', 'fecha_registro')
    ordering = ('-fecha_registro',)