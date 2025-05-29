from rest_framework import serializers

from .models import UploadedFile


class FileManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = "__all__"
