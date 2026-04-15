import json
import sqlite3
from pathlib import Path


SCHEMA = """
CREATE TABLE IF NOT EXISTS experiment_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone_suffix4 TEXT,
  assigned_group TEXT NOT NULL,
  questionnaire_answers_json TEXT NOT NULL,
  question_answer_detail_json TEXT NOT NULL,
  timing_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
"""


def _ensure_parent_dir(database_path):
    # SQLite creates the database file automatically, but not its parent folder.
    Path(database_path).parent.mkdir(parents=True, exist_ok=True)


def init_db(database_path):
    # Safe to run on every startup because the schema uses IF NOT EXISTS.
    _ensure_parent_dir(database_path)
    conn = sqlite3.connect(database_path)
    try:
        conn.execute(SCHEMA)
        conn.commit()
    finally:
        conn.close()


def insert_result(database_path, payload):
    _ensure_parent_dir(database_path)
    conn = sqlite3.connect(database_path)
    try:
        # Use parameterized SQL instead of string interpolation to avoid SQL injection.
        # The three complex fields are stored as JSON text so the table stays small
        # and future survey/lecture changes do not require schema changes.
        cursor = conn.execute(
            """
            INSERT INTO experiment_results (
              phone_suffix4,
              assigned_group,
              questionnaire_answers_json,
              question_answer_detail_json,
              timing_json
            ) VALUES (?, ?, ?, ?, ?)
            """,
            (
                payload.get("phone_suffix4"),
                payload["assigned_group"],
                json.dumps(payload["questionnaire_answers"], ensure_ascii=False),
                json.dumps(payload["question_answer_detail"], ensure_ascii=False),
                json.dumps(payload["timing"], ensure_ascii=False),
            ),
        )
        conn.commit()
        return cursor.lastrowid
    finally:
        conn.close()
