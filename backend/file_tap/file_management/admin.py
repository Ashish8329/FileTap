from django.contrib import admin

from base.base_admin import BaseAdmin

from .models import UploadedFile


@admin.register(UploadedFile)
class UloadedFileAdmin(BaseAdmin):
    fields = ("name", "file", "created_at", "updated_at")
    list_display = ("name", "created_at")
