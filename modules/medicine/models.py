from django.db import models
from django.utils import timezone

class Medicine(models.Model):
    nombre = models.CharField(max_length=255, unique=True, verbose_name="Nombre")
    descripcion = models.TextField(blank=True, null=True, verbose_name="Descripción")
    cantidad = models.PositiveIntegerField(default=0, verbose_name="Cantidad disponible")
    fecha_expiracion = models.DateField(blank=True, null=True, verbose_name="Fecha de expiración")

    creado = models.DateTimeField(default=timezone.now, verbose_name="Fecha de creación")
    actualizado = models.DateTimeField(auto_now=True, verbose_name="Última actualización")

    class Meta:
        db_table = "medicine"
        ordering = ["nombre"]
        verbose_name = "Medicamento"
        verbose_name_plural = "Medicamentos"