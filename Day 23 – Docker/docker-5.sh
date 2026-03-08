# ============================================
# LIST NETWORKS
# ============================================

docker network ls
docker network ls --filter driver=bridge
docker network ls --filter name=my
docker network ls -q  # Only IDs
docker network ls --format "table {{.Name}}\t{{.Driver}}"

# ============================================
# CREATE NETWORKS
# ============================================

# Bridge network (default)
docker network create mynetwork
docker network create --driver bridge mynetwork
docker network create --driver bridge --subnet=172.20.0.0/16 mynetwork
docker network create --subnet=172.20.0.0/16 --ip-range=172.20.5.0/24 mynetwork
docker network create --gateway=172.20.0.1 mynetwork

# Overlay network (for swarm)
docker network create --driver overlay myoverlay
docker network create --driver overlay --attachable myoverlay

# Macvlan network
docker network create -d macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 macnet

# IPv6 network
docker network create --ipv6 --subnet=2001:db8::/64 mynetwork

# ============================================
# CONNECT/DISCONNECT CONTAINERS
# ============================================

# Connect container to network
docker network connect mynetwork container1
docker network connect --ip 172.20.0.10 mynetwork container1
docker network connect --alias app mynetwork container1

# Disconnect container
docker network disconnect mynetwork container1
docker network disconnect -f mynetwork container1  # Force

# ============================================
# INSPECT NETWORK
# ============================================

docker network inspect mynetwork
docker network inspect bridge | grep -A 10 "Containers"
docker network inspect --format='{{range .Containers}}{{.Name}}{{end}}' mynetwork

# ============================================
# REMOVE NETWORKS
# ============================================

docker network rm mynetwork
docker network rm network1 network2 network3
docker network prune  # Remove unused networks
docker network prune -f  # Force without confirmation
docker network prune --filter "until=24h"