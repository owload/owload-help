#!/bin/sh
# Copies a bucket of Owload to a backup that Owload's server has no key for. Run it on a schedule, on a machine that is NOT Owload's server.
#
# In rclone.conf, "source" is the bucket, with a key that can only list and read, and "backup" is a bucket at another provider or account.
# What a run replaces or deletes is moved to archive/<date>, so that an earlier state can be put back, whatever happened to the source.
#
# The order matters. The log goes before the data, so that it never names data the backup does not have. Batches of the log are only
# added until its chunks are done: the chunks may have been merged into a batch in the meantime, and no stretch of the log may be missing.
set -eu

SOURCE="source:my-owload-bucket"
BACKUP="backup:my-owload-backup"
KEEP_DAYS=30

STAMP=$(date -u +%Y-%m-%dT%H-%M-%SZ)
OPTIONS="--checksum --transfers 8 --s3-no-check-bucket"

sync_part() { rclone sync "$SOURCE/$1" "$BACKUP/current/$1" --backup-dir "$BACKUP/archive/$STAMP/$1" $OPTIONS; }
copy_part() { rclone copy "$SOURCE/$1" "$BACKUP/current/$1" $OPTIONS; }

copy_part ops-batches
sync_part ops
sync_part ops-batches
copy_part drives
sync_part data

# Old archives go by the date in their name: files keep their own dates when they are moved.
OLDEST=$(date -u -d "$KEEP_DAYS days ago" +%Y-%m-%dT 2>/dev/null || date -u -v-"$KEEP_DAYS"d +%Y-%m-%dT)
rclone lsf --dirs-only "$BACKUP/archive" | while read -r run; do
  if [ "$run" \< "$OLDEST" ]; then
    rclone purge "$BACKUP/archive/$run"
  fi
done

echo "Backup finished: $STAMP"
