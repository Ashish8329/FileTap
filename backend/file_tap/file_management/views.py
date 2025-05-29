from django.shortcuts import render
from rest_framework import viewsets

from .models import UploadedFile
from .serializers import FileManagementSerializer

# Create your views here.


class FileManagementViewSet(viewsets.ModelViewSet):
    queryset = UploadedFile.objects.all()
    serializer_class = FileManagementSerializer
