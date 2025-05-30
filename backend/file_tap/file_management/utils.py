import os
import subprocess
from django.conf import settings
from django.shortcuts import render
from django.utils.html import escape
from base.utils import error_response, success_response


def process_view_text_file(filename, message):
    """
    this will process the text file in notepad.
    """
    # Sanitize filename to prevent directory traversal
    safe_filename = os.path.basename(escape(filename))
    file_path = os.path.join(settings.MEDIA_ROOT, "text_files", safe_filename)

    if os.path.exists(file_path):
        try:
            subprocess.Popen(["notepad.exe", file_path])
            return success_response(message=message)
        except Exception as e:
            return error_response(message=str(e))
    else:
        return error_response(message="File does not exist")