import os

# Pull in configuration from our environment
# In localdev/compose, this will be set by the .env.local file
# In a shared environment (K8S), would be set in something like AWS Secrets Manager, Vault
# or via the K8S configmap (if cluster is secured so that average person can't directly view configmaps)
class Config(object):
    def __init__(self):
        # Basic setup - non-sensitive values
        self.ENV = os.getenv('ENV')
        self.SERVER_PORT = int(os.getenv('SERVER_PORT'))
        self.API_PATH = os.getenv('API_PATH')

        # Connection strings - sensitive
        self.REDIS_CN = os.getenv('REDIS_CN')
        self.MONGO_CN = os.getenv('MONGO_CN')
        self.NATS_CN = os.getenv('NATS_CN')
