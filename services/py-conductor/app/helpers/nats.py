# Nats helper package
from pynats import NATSClient

def check_connection():
    with NATSClient(url=get_url()):
        pass
