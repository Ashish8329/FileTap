import base64
import uuid


def generate_short_uuid():
    uid = uuid.uuid4()
    return base64.urlsafe_b64encode(uid.bytes).decode()[:12]
