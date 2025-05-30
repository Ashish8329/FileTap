from django.urls import include, path

from .views import (CheckLocalFileViewSet, FileManagementViewSet,
                    ViewTextFileViewSet)

urlpatterns = [
    path("", FileManagementViewSet.as_view({"get": "list", "post": "create"})),
    path("check-file", CheckLocalFileViewSet.as_view()),
    path("view-file", ViewTextFileViewSet.as_view()),
    # path("download-file", DownloadGoogleDriveFileView.as_view()),
]
