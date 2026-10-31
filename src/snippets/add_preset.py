"""Adds one S3 storage preset (a storage the operator offers to every user) to the database.

Presets have no API and no UI (decision 0011): the operator adds them with this script, which asks for the values one by one, so the
secret key never lands in a shell history, and stores the secret key encrypted with BACKEND_SECRET_KEY like the backend does.

Run it inside the backend container, in a terminal:

    docker compose cp add_preset.py backend:/tmp/add_preset.py
    docker compose exec backend sh -c 'cd /app && PYTHONPATH=/app python /tmp/add_preset.py'
"""

import asyncio
import getpass

from app.db.models import S3Preset
from app.db.session import async_session_factory
from app.services.secrets import encrypt_secret


async def main() -> None:
    label = input("Label (shown to users): ").strip()
    tier = input("Tier (HOT or COLD): ").strip().upper()
    endpoint = input("Endpoint URL (empty for AWS S3): ").strip() or None
    region = input("Region (e.g. us-east-1): ").strip()
    bucket = input("Bucket: ").strip()
    access_key = input("Access key: ").strip()
    secret_key = getpass.getpass("Secret key (hidden): ").strip()
    use_ssl = input("Use SSL? [Y/n]: ").strip().lower() != "n"
    if tier not in ("HOT", "COLD"):
        raise SystemExit("Tier must be HOT or COLD")
    async with async_session_factory() as db:
        preset = S3Preset(
            label=label,
            tier=tier,
            endpoint_url=endpoint,
            region=region,
            bucket=bucket,
            access_key=access_key,
            secret_key=encrypt_secret(secret_key),
            use_ssl=use_ssl,
        )
        db.add(preset)
        await db.commit()
        print("Preset id:", preset.id)


asyncio.run(main())
