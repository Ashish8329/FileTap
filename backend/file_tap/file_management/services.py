import io

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from django.conf import settings

SCOPES = settings.SCOPES
SERVICE_ACCOUNT_FILE = settings.SERVICE_ACCOUNT_FILE


def get_drive_service():
    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )
    service = build("drive", "v3", credentials=credentials)
    return service


def search_file_in_drive(filename, folder_id):
    """
    this will search the file on the google drive folder
    """
    service = get_drive_service()

    query = f"name = '{filename}' and '{folder_id}' in parents and mimeType = 'text/plain' and trashed = false"

    results = service.files().list(q=query, fields="files(id, name)").execute()

    files = results.get("files", [])
    return files[0] if files else None


def download_file_from_drive(file_id, destination_path):
    """
    this will download the file in the ststem from the google drive
    """
    service = get_drive_service()

    request = service.files().get_media(fileId=file_id)
    fh = io.FileIO(destination_path, "wb")
    downloader = MediaIoBaseDownload(fh, request)

    done = False
    while not done:
        status, done = downloader.next_chunk()
        print(f"Download progress: {int(status.progress() * 100)}%")

    return destination_path
