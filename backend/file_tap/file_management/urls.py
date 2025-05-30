from django.urls import include, path

from .views import CheckLocalFileViewSet, FileManagementViewSet

urlpatterns = [
    path("", FileManagementViewSet.as_view({"get": "list", "post": "create"})),
    path("check-file", CheckLocalFileViewSet.as_view()),
    # path("download-file", DownloadGoogleDriveFileView.as_view()),
]
