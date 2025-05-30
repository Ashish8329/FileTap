import os
import subprocess

from django.conf import settings
from django.shortcuts import render
from django.utils.html import escape
from rest_framework import viewsets
from rest_framework.views import APIView
from .utils import process_view_text_file

from base.utils import error_response, success_response

from .models import UploadedFile
from .serializers import FileManagementSerializer
from .services import download_file_from_drive, search_file_in_drive


class FileManagementViewSet(viewsets.ModelViewSet):
    """
    this api is used to list out the files
    """

    queryset = UploadedFile.objects.all()
    serializer_class = FileManagementSerializer

    def list(self, request, *args, **kwargs):
        data = self.get_queryset()

        if data.exists():
            serializer = FileManagementSerializer(data, many=True)
            return success_response(data= serializer.data)

        return error_response(message="No files found")


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

            return process_view_text_file(filename, message="File is available locally.")

        # check the file in the google drive
        file = search_file_in_drive(filename, settings.GOOGLE_DRIVE_FOLDER_ID)

        if file:
            # download the file from google drive to system
            destination_dir = "media/text_files"
            os.makedirs(destination_dir, exist_ok=True)
            destination_path = os.path.join(destination_dir, filename)

            try:
                download_file_from_drive(file["id"], destination_path)
                file_url = request.build_absolute_uri(f"/media/text_files/{filename}")
                
                return process_view_text_file(filename, message="File is available in google drive")

            except Exception as e:
                return error_response(message=f"error : str{e}")

        return error_response(message="File not found locally or on Google Drive.")


class ViewTextFileViewSet(APIView):
    """
    This api is used to view the text file in the notepad
    """

    def get(self, request):
        filename = request.query_params.get("file_name")

        # Basic validation
        if not filename or not filename.endswith(".txt"):
            return error_response(message="Invalid or missing filename")

        # Sanitize filename to prevent directory traversal
        safe_filename = os.path.basename(escape(filename))
        file_path = os.path.join(settings.MEDIA_ROOT, "text_files", safe_filename)

        if os.path.exists(file_path):
            try:
                subprocess.Popen(["notepad.exe", file_path])
                return success_response(message=f"{safe_filename} opened in Notepad")
            except Exception as e:
                return error_response(message=str(e))
        else:
            return error_response(message="File does not exist")


# class DownloadGoogleDriveFileView(APIView):
#     """
#     this api is used to download the google drive file in the system.
#     """

#     def post(self, request):

#         file_id = request.query_params.get("file_id")
#         file_name = request.query_params.get("file_name")

#         if not file_id or not file_name:
#             return error_response(message="file_id and file_name are required")

#         destination_dir = "media/text_files"
#         os.makedirs(destination_dir, exist_ok=True)
#         destination_path = os.path.join(destination_dir, file_name)

#         try:
#             download_file_from_drive(file_id, destination_path)
#             file_url = request.build_absolute_uri(f"/media/text_files/{file_name}")
#             return success_response(message="downloaded", data=file_url)

#         except Exception as e:
#             return error_response(message=f"error : str{e}")
