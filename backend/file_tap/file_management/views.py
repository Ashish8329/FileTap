import os

from django.conf import settings
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView

from base.utils import error_response, success_response

from .models import UploadedFile
from .serializers import FileManagementSerializer
from .services import download_file_from_drive, search_file_in_drive

GOOGLE_DRIVE_FOLDER_ID = "1yG8TUS8OhkLTcgox-Ttttdh5DiFCn2Y7"


class FileManagementViewSet(viewsets.ModelViewSet):
    """
    this api is used to list out the files
    """

    queryset = UploadedFile.objects.all()
    serializer_class = FileManagementSerializer


class CheckLocalFileViewSet(APIView):
    """
    this api is used to check is file present locally if not check is it present on the google drive.
    """

    def get(self, request):
        filename = request.query_params.get("file_name")

        # file validation check
        if not filename or not filename.endswith(".txt"):
            return error_response(message="Invalid or missing filename")

        # check if file exist in the system
        local_dir = os.path.join(settings.MEDIA_ROOT, "text_files")
        local_file_path = os.path.join(local_dir, filename)

        if os.path.exists(local_file_path):
            file_url = request.build_absolute_uri(
                os.path.join(settings.MEDIA_URL, "text_files", filename)
            )
            return success_response(
                message="File is available locally.", data={"file_path": file_url}
            )

        # check the file in the google drive
        file = search_file_in_drive(filename, GOOGLE_DRIVE_FOLDER_ID)

        if file:
            return success_response(
                message="File is available in drive.", data={"file_id": file["id"]}
            )
        else:
            return error_response(message="File not found locally or on Google Drive.")


class DownloadGoogleDriveFileView(APIView):
    """
    this api is used to download the google drive file in the system.
    """

    def post(self, request):

        file_id = request.query_params.get("file_id")
        file_name = request.query_params.get("file_name")

        if not file_id or not file_name:
            return error_response(message="file_id and file_name are required")

        destination_dir = "media/text_files"
        os.makedirs(destination_dir, exist_ok=True)
        destination_path = os.path.join(destination_dir, file_name)

        try:
            download_file_from_drive(file_id, destination_path)
            file_url = request.build_absolute_uri(f"/media/text_files/{file_name}")
            return success_response(message="downloaded", data=file_url)

        except Exception as e:
            return error_response(message=f"error : str{e}")
