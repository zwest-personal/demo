from importlib import reload

from .app.config import Config
import uvicorn

if __name__ == "__main__":
    config = uvicorn.Config("app:main:app", port=Config().SERVER_PORT, log_level="info", reload=(Config().ENV=="dev"))
    server = uvicorn.Server(config)
    server.run()
