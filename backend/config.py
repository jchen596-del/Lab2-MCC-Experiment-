import os
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent


def load_config():
    # Keep local settings outside source code. In production, these values can
    # come from real environment variables instead of backend/.env.
    load_dotenv(BASE_DIR / ".env")
    return {
        "DEBUG": os.getenv("FLASK_DEBUG", "0") == "1",
        "HOST": os.getenv("FLASK_HOST", "127.0.0.1"),
        "PORT": int(os.getenv("FLASK_PORT", "5000")),
        "DATABASE_PATH": os.getenv(
            "DATABASE_PATH",
            str(BASE_DIR / "data" / "experiment.sqlite3"),
        ),
    }
