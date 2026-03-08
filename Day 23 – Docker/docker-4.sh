# ============================================
# LIST VOLUMES
# ============================================

docker volume ls
docker volume ls --filter dangling=true
docker volume ls -q
docker volume ls --format "table {{.Name}}\t{{.Driver}}\t{{.Mountpoint}}"

# ============================================
# CREATE VOLUMES
# ============================================

# Basic volume
docker volume create myvolume
docker volume create --label environment=production myvolume

# Volume with driver options
docker volume create --driver local \
  --opt type=nfs \
  --opt o=addr=192.168.1.1,rw \
  --opt device=:/path/to/dir nfs-volume

# Volume with size limit
docker volume create --driver local \
  --opt type=tmpfs \
  --opt device=tmpfs \
  --opt o=size=100m,uid=1000 mytmpfs

# ============================================
# INSPECT VOLUME
# ============================================

docker volume inspect myvolume
docker volume inspect --format='{{.Mountpoint}}' myvolume
docker volume inspect $(docker volume ls -q)

# ============================================
# REMOVE VOLUMES
# ============================================

docker volume rm myvolume
docker volume rm volume1 volume2 volume3
docker volume prune  # Remove unused volumes
docker volume prune -a  # Remove all unused volumes
docker volume prune -f --filter "label=environment=test"

# ============================================
# VOLUME BACKUP AND RESTORE
# ============================================

# Backup volume to host
docker run --rm -v myvolume:/data -v /backup:/backup alpine \
  tar czf /backup/backup-$(date +%Y%m%d-%H%M%S).tar.gz -C /data .

# Restore volume from backup
docker run --rm -v myvolume:/data -v /backup:/backup alpine \
  tar xzf /backup/backup-20240101.tar.gz -C /data

# Copy between volumes
docker run --rm -v source-volume:/from -v dest-volume:/to alpine \
  cp -av /from/. /to/

# Backup and compress on the fly
docker run --rm -v myvolume:/data alpine tar cz -C /data . | \
  gzip > backup.tar.gz