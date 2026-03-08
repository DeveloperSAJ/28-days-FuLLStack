# ============================================
# RUN CONTAINERS
# ============================================

# Basic run
docker run nginx
docker run -d nginx  # Detached mode (background)
docker run -it ubuntu bash  # Interactive with terminal
docker run --rm ubuntu echo "Hello"  # Auto-remove when done

# Named container
docker run --name mynginx nginx
docker run --name mydb -d mysql:8.0

# Port mapping
docker run -p 8080:80 nginx  # Map host 8080 to container 80
docker run -p 8080:80 -p 8443:443 nginx  # Multiple ports
docker run -p 127.0.0.1:8080:80 nginx  # Bind to specific interface
docker run -P nginx  # Publish all exposed ports to random ports

# Volume mounting
docker run -v /host/data:/container/data nginx  # Bind mount
docker run -v myvolume:/data nginx  # Named volume
docker run --mount source=myvolume,target=/app/data nginx  # Mount syntax
docker run -v /container/data nginx  # Anonymous volume
docker run --tmpfs /tmp nginx  # Temporary filesystem

# Environment variables
docker run -e ENV_VAR=value nginx
docker run --env ENV_VAR=value nginx
docker run --env-file .env nginx  # Load from file
docker run -e DATABASE_URL=postgres://user:pass@db:5432/app api

# Resource limits
docker run --memory 512m --cpus 1 nginx
docker run --memory 1g --cpus 0.5 --memory-swap 2g nginx
docker run --cpuset-cpus 0-2 --device-read-bps /dev/sda:1mb nginx

# Restart policies
docker run --restart no nginx
docker run --restart on-failure:5 nginx  # Max 5 retries
docker run --restart always nginx
docker run --restart unless-stopped nginx

# Network settings
docker run --network bridge nginx
docker run --network host nginx  # Use host network
docker run --network none nginx  # No network
docker run --network mynetwork nginx
docker run --network container:other_container nginx  # Share network

# Working directory and user
docker run -w /app node npm start
docker run -u 1000:1000 nginx
docker run --user node node whoami

# DNS settings
docker run --dns 8.8.8.8 --dns 8.8.4.4 nginx
docker run --hostname myhost --add-host host.docker.internal:host-gateway nginx

# Logging
docker run --log-driver json-file --log-opt max-size=10m --log-opt max-file=3 nginx
docker run --log-driver syslog --log-opt syslog-address=tcp://logs.example.com:514 nginx

# ============================================
# CONTAINER MANAGEMENT
# ============================================

# List containers
docker ps  # Running containers
docker ps -a  # All containers
docker ps -q  # Only IDs
docker ps -s  # Show file sizes
docker ps --filter status=exited  # Filter by status
docker ps --filter name=mynginx  # Filter by name
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Start/Stop containers
docker start container_id
docker start -a container_id  # Attach after start
docker stop container_id
docker stop -t 30 container_id  # Grace period timeout
docker restart container_id
docker restart -t 10 container_id  # Timeout before kill

# Pause/Unpause
docker pause container_id  # Freeze processes
docker unpause container_id  # Unfreeze

# Kill (force stop)
docker kill container_id
docker kill -s SIGTERM container_id  # Send specific signal

# ============================================
# REMOVE CONTAINERS
# ============================================

# Remove specific container
docker rm container_id
docker rm -f container_id  # Force remove running container
docker rm container1 container2 container3  # Multiple

# Remove stopped containers
docker container prune
docker container prune -f  # Force without confirmation
docker container prune --filter "until=24h"  # Older than 24h

# Remove all containers
docker rm $(docker ps -aq)
docker rm -f $(docker ps -aq)  # Force remove all
docker ps -aq | xargs docker rm  # Alternative

# Remove by filter
docker rm $(docker ps -qf status=exited)
docker rm $(docker ps -qf "name=test")
docker rm $(docker ps -qf "status=created")

# ============================================
# EXECUTE COMMANDS IN CONTAINERS
# ============================================

# Interactive shell
docker exec -it container_id bash
docker exec -it container_id sh
docker exec -it container_id /bin/bash
docker exec -it container_id powershell  # Windows containers

# Run single command
docker exec container_id ls -la
docker exec container_id cat /etc/hosts
docker exec container_id whoami
docker exec container_id env  # Show environment

# Run as specific user
docker exec -u root container_id whoami
docker exec -u 1000:1000 container_id id

# Set working directory
docker exec -w /app container_id pwd

# With environment variables
docker exec -e VAR=value container_id env

# ============================================
# CONTAINER LOGS
# ============================================

# View logs
docker logs container_id
docker logs -f container_id  # Follow (tail -f)
docker logs --tail 100 container_id  # Last 100 lines
docker logs --tail 0 -f container_id  # Start from now

# Timestamps
docker logs -t container_id  # Show timestamps
docker logs --since 2024-01-01T00:00:00 container_id
docker logs --until 2024-01-02T00:00:00 container_id
docker logs --since 5m container_id  # Last 5 minutes

# ============================================
# CONTAINER INFORMATION
# ============================================

# Container stats
docker stats  # All containers (live)
docker stats container_id  # Specific container
docker stats --no-stream  # One-time stats
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"

# Top processes
docker top container_id
docker top container_id aux  # With full format

# Inspect container
docker inspect container_id
docker inspect --format='{{.NetworkSettings.IPAddress}}' container_id
docker inspect --format='{{.State.Running}}' container_id
docker inspect --format='{{json .Config}}' container_id | jq

# Port mapping
docker port container_id
docker port container_id 80  # Specific port

# Diff (changes in container)
docker diff container_id

# Events
docker events
docker events --filter 'container=container_id'
docker events --since '5m' --until '10m'

# ============================================
# COPY FILES
# ============================================

# Copy to container
docker cp file.txt container_id:/path/
docker cp file.txt container_id:/path/newfile.txt
docker cp -a folder container_id:/path/  # Copy recursively

# Copy from container
docker cp container_id:/path/file.txt .
docker cp container_id:/path/folder ./folder
docker cp container_id:/app/logs/app.log ./logs/

# Copy between containers
docker cp container1:/path/file - | docker cp - container2:/path/

# ============================================
# COMMIT CHANGES TO NEW IMAGE
# ============================================

# Commit container to image
docker commit container_id myimage:new
docker commit -m "Added feature" -a "Author" container_id myimage:new
docker commit --change='CMD ["app"]' container_id myimage:new

# ============================================
# RENAME CONTAINER
# ============================================

docker rename old_name new_name

# ============================================
# UPDATE CONTAINER RESOURCES
# ============================================

docker update --cpus 1 --memory 512m container_id
docker update --restart=always container_id
docker update --cpuset-cpus 0-2 --memory-swap -1 container_id

# ============================================
# WAIT FOR CONTAINER
# ============================================

docker wait container_id  # Blocks until container stops, returns exit code

# ============================================
# ATTACH TO CONTAINER
# ============================================

docker attach container_id  # Attach to running container
# Ctrl+P, Ctrl+Q to detach without stopping