from datetime import datetime
import re

from flask import Flask, jsonify, request

try:
    from .config import load_config
    from .db import init_db, insert_result
except ImportError:  # Supports `python3 backend/app.py`
    from config import load_config
    from db import init_db, insert_result


def _is_non_empty_string(value):
    return isinstance(value, str) and value.strip() != ""


def _is_json_object(value):
    return isinstance(value, dict)


def _parse_iso8601(value):
    if not isinstance(value, str) or value.strip() == "":
        return None
    try:
        # Frontend timestamps use a trailing Z for UTC; datetime.fromisoformat
        # expects an explicit +00:00 offset.
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


def _validate_session_timing(session_timing):
    # This project defines session time as the main lecture flow only:
    # first lecture audio start -> last lecture question submit.
    if not _is_json_object(session_timing):
        return "timing.session must be an object"

    started_at = _parse_iso8601(session_timing.get("started_at"))
    if started_at is None:
        return "timing.session.started_at must be a valid ISO 8601 timestamp"

    ended_at = _parse_iso8601(session_timing.get("ended_at"))
    if ended_at is None:
        return "timing.session.ended_at must be a valid ISO 8601 timestamp"

    if ended_at < started_at:
        return "timing.session.ended_at must be later than or equal to started_at"

    total_session_sec = session_timing.get("total_session_sec")
    if not isinstance(total_session_sec, int) or total_session_sec < 0:
        return "timing.session.total_session_sec must be a non-negative integer"

    # Match the frontend's APP.diffSeconds behavior, which rounds seconds.
    expected_total = round((ended_at - started_at).total_seconds())
    if total_session_sec != expected_total:
        return "timing.session.total_session_sec must match ended_at - started_at in seconds"

    return None


def _is_empty_timing_value(value):
    return value is None or value == ""


def _is_non_negative_integer(value):
    return type(value) is int and value >= 0


def _validate_lecture_timings(timing):
    lectures = timing.get("lectures")
    if lectures is None:
        return None
    if not _is_json_object(lectures):
        return "timing.lectures must be an object"

    for lecture_id, lecture_timing in lectures.items():
        if not _is_non_empty_string(lecture_id):
            return "timing.lectures keys must be non-empty strings"
        if not _is_json_object(lecture_timing):
            return f"timing.lectures.{lecture_id} must be an object"

        for field in ("audio_sec", "question_sec"):
            value = lecture_timing.get(field)
            if _is_empty_timing_value(value):
                continue
            if not _is_non_negative_integer(value):
                return f"timing.lectures.{lecture_id}.{field} must be a non-negative integer or empty"

    return None


def validate_payload(payload):
    # Validate the boundary before touching SQLite. This catches malformed data
    # early and keeps the database format predictable for later analysis.
    if not _is_json_object(payload):
        return "request body must be a JSON object"

    phone_suffix4 = payload.get("phone_suffix4")
    if phone_suffix4 is not None:
        if not isinstance(phone_suffix4, str):
            return "phone_suffix4 must be a string"
        # Empty is allowed for local testing, but any non-empty value must be
        # exactly the last 4 digits of a phone number.
        if phone_suffix4.strip() and not re.fullmatch(r"\d{4}", phone_suffix4.strip()):
            return "phone_suffix4 must be exactly 4 digits"

    assigned_group = payload.get("assigned_group")
    if not _is_non_empty_string(assigned_group):
        return "assigned_group is required"
    # Group is a whitelist, not free text. This also blocks obvious injected
    # strings before they reach the database insert layer.
    if assigned_group not in {"C1", "C2", "C3"}:
        return "assigned_group must be one of: C1, C2, C3"

    if not _is_json_object(payload.get("questionnaire_answers")):
        return "questionnaire_answers must be an object"

    if not _is_json_object(payload.get("question_answer_detail")):
        return "question_answer_detail must be an object"

    if not _is_json_object(payload.get("timing")):
        return "timing must be an object"

    timing_error = _validate_session_timing(payload["timing"].get("session"))
    if timing_error:
        return timing_error

    lecture_timing_error = _validate_lecture_timings(payload["timing"])
    if lecture_timing_error:
        return lecture_timing_error

    return None


def create_app(test_config=None):
    app = Flask(__name__)
    app.config.update(load_config())
    if test_config:
        # Tests override the database path so test writes never touch real data.
        app.config.update(test_config)

    init_db(app.config["DATABASE_PATH"])

    @app.after_request
    def add_cors_headers(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    @app.get("/health")
    def health():
        return jsonify({"ok": True})

    @app.route("/api/results", methods=["POST", "OPTIONS"])
    def create_result():
        if request.method == "OPTIONS":
            return "", 204

        # silent=True turns invalid JSON into None, letting validate_payload
        # return a clean 400 response instead of Flask raising an HTML error.
        payload = request.get_json(silent=True)
        error = validate_payload(payload)
        if error:
            return jsonify({"ok": False, "error": error}), 400

        row_id = insert_result(app.config["DATABASE_PATH"], payload)
        return jsonify({"ok": True, "id": row_id}), 201

    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        host=app.config["HOST"],
        port=app.config["PORT"],
        debug=app.config["DEBUG"],
    )
