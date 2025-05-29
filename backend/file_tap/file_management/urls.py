from django.urls import include, path

from .views import FileManagementViewSet

urlpatterns = [
    path("", FileManagementViewSet.as_view({"get": "list", "post": "create"}))
]
