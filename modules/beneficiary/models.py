from django.db import models

class Beneficiary(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    fecha_registro = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    correo_electronico = models.EmailField(max_length=255, unique=True, blank=True, null=True)
    direccion = models.TextField(blank=True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)

    TIPO_CANCER_CHOICES = [
        ('Mama', 'Cáncer de mama'),
        ('Pulmon', 'Cáncer de pulmón'),
        ('Colon', 'Cáncer de colon'),
        ('Otro', 'Otro'),
    ]
    tipo_cancer = models.CharField(max_length=50, choices=TIPO_CANCER_CHOICES, blank=True, null=True)

    genero = models.CharField(
        max_length=1,
        choices=[
            ('M', 'Masculino'),
            ('F', 'Femenino'),
            ('O', 'Otro'),
        ],
        blank=True,
        null=True
    )

    activa = models.BooleanField(default=True, blank=True, null=True)
    documentos = models.JSONField(default=list, blank=True, null=True)
    notas = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "beneficiary"
        ordering = ["fecha_registro"]
        verbose_name = "Beneficiario"
        verbose_name_plural = "Beneficiarios"

    def __str__(self):
        return f"{self.nombre} ({self.tipo_cancer or 'No especificado'})"
        