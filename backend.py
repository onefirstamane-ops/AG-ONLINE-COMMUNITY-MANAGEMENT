
import os
import secrets
from datetime import date, timedelta
from urllib.parse import urlencode

from flask import Flask, redirect, request, jsonify, session
from flask_cors import CORS
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "")

if not app.secret_key:
    raise RuntimeError("FLASK_SECRET_KEY is not configured")

FRONTEND_ORIGIN = (
    "https://onefirstamane-ops.github.io"
)
BACKEND_URL = os.environ.get("BACKEND_URL", "").rstrip("/")
CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "")
CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", "")

REDIRECT_URI = f"{BACKEND_URL}/oauth2callback"

SCOPES = [
    "https://www.googleapis.com/auth/yt-analytics.readonly",
    "https://www.googleapis.com/auth/youtube.readonly",
]

CORS(app, resources={
    r"/api/*": {"origins": [FRONTEND_ORIGIN]}
})

# Temporary storage only. Tokens are lost when the service restarts.
authorized_credentials = {}

def make_flow(state=None):
    if not CLIENT_ID or not CLIENT_SECRET or not BACKEND_URL:
        raise RuntimeError("Google OAuth environment variables are missing")

    return Flow.from_client_config(
        {
            "web": {
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": [REDIRECT_URI],
            }
        },
        scopes=SCOPES,
        state=state,
        redirect_uri=REDIRECT_URI,
    )

@app.get("/")
def home():
    return jsonify({
        "service": "AG Community YouTube Backend",
        "status": "running"
    })

@app.get("/auth/google")
def google_login():
    flow = make_flow()
    state = secrets.token_urlsafe(32)
    session["oauth_state"] = state
    flow.redirect_uri = REDIRECT_URI

    url, _ = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="true",
        state=state,
        prompt="consent",
    )
    return redirect(url)

@app.get("/oauth2callback")
def oauth_callback():
    expected_state = session.get("oauth_state")
    received_state = request.args.get("state")

    if not expected_state or not secrets.compare_digest(
        expected_state, received_state or ""
    ):
        return "Invalid OAuth state. Please start again.", 400

    if request.args.get("error"):
        return "Google authorization was not completed.", 400

    flow = make_flow(state=expected_state)
    flow.fetch_token(authorization_response=request.url)

    creds = flow.credentials
    if not creds or not creds.valid:
        return "Authorization failed.", 400

    authorized_credentials["current"] = creds
    session.pop("oauth_state", None)

    return jsonify({
        "connected": True,
        "message": "YouTube authorization successful. "
                   "This temporary connection may be lost on restart."
    })

@app.get("/api/analytics")
def analytics():
    creds = authorized_credentials.get("current")

    if not creds:
        return jsonify({
            "error": "Connect a YouTube account first",
            "connect_url": f"{BACKEND_URL}/auth/google"
        }), 401

    try:
        youtube = build("youtube", "v3", credentials=creds)
        channels = youtube.channels().list(
            part="snippet,statistics",
            mine=True
        ).execute()

        if not channels.get("items"):
            return jsonify({"error": "No channel found"}), 404

        channel = channels["items"][0]
        stats = channel.get("statistics", {})

        end_date = date.today() - timedelta(days=1)
        start_date = end_date - timedelta(days=27)

        analytics_api = build(
            "youtubeAnalytics", "v2", credentials=creds
        )
        report = analytics_api.reports().query(
            ids="channel==MINE",
            startDate=start_date.isoformat(),
            endDate=end_date.isoformat(),
            metrics="views,estimatedMinutesWatched",
        ).execute()

        return jsonify({
            "channel": channel["snippet"]["title"],
            "subscribers": (
                None if stats.get("hiddenSubscriberCount")
                else int(stats.get("subscriberCount", 0))
            ),
            "totalViews": int(stats.get("viewCount", 0)),
            "videoCount": int(stats.get("videoCount", 0)),
            "analytics28Days": report.get("rows", []),
            "analyticsHeaders": [
                h["name"] for h in report.get("columnHeaders", [])
            ],
        })
    except Exception:
        app.logger.exception("YouTube API request failed")
        return jsonify({
            "error": "YouTube API request failed. Check service logs."
        }), 502

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 10000)))
