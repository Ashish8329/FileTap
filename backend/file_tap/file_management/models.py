from django.db import models
from django.utils.translation import gettext_lazy as _

from base.base_models import BaseModel


class UploadedFile(BaseModel):
    name = models.CharField(
        max_length=150,
        help_text="Name of the uploaded file",
        unique=True,
        verbose_name=_("Uploaded File Name"),
    )
    file = models.FileField(
        upload_to="text_files/",
        verbose_name=_("Uploaded Text File"),
        help_text="Text file",
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = _("File")
        verbose_name_plural = _("Files")

    def __str__(self):
        return self.name
