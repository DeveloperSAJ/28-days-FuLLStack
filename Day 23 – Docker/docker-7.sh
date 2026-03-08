# ============================================
# LIST IMAGES
# ============================================

# List all images
docker images
docker image ls
docker image ls -a  # Show all images (including intermediate)
docker image ls --digests  # Show digests
docker image ls --filter dangling=true  # Show dangling images
docker image ls --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
docker image ls | grep <pattern>  # Search for specific images

# ============================================
# PULL IMAGES
# ============================================

# Pull from Docker Hub
docker pull ubuntu:latest
docker pull ubuntu:22.04
docker pull ubuntu:20.04

# Pull from specific registry
docker pull myregistry.local:5000/myapp:1.0
docker pull gcr.io/google-samples/hello-app:1.0

# Pull multiple tags
docker pull nginx:alpine
docker pull nginx:1.25
docker pull nginx:1.25-alpine
docker pull nginx:1.25-perl

# Pull all tags (not directly possible, need script)
for tag in latest 1.25 1.24 1.23; do
  docker pull nginx:$tag
done

# ============================================
# SEARCH IMAGES
# ============================================

# Search Docker Hub
docker search nginx
docker search --limit 10 python
docker search --filter stars=1000 mysql
docker search --filter is-official=true redis
docker search --filter is-automated=true jenkins

# ============================================
# BUILD IMAGES
# ============================================

# Basic build
docker build -t myapp:1.0 .
docker build -t myapp:latest -f Dockerfile.prod .

# Build with no cache
docker build --no-cache -t myapp:1.0 .

# Build with build args
docker build --build-arg VERSION=1.0 --build-arg ENV=production -t myapp:1.0 .

# Build with specific target (multi-stage)
docker build --target production -t myapp:prod .
docker build --target development -t myapp:dev .

# Build and tag multiple tags
docker build -t myapp:1.0 -t myapp:latest -t myrepo/myapp:1.0 .

# Build with custom context
docker build -f docker/Dockerfile -t myapp:1.0 .

# Build from git repository
docker build github.com/username/repo

# Build with buildx (advanced features)
docker buildx build --platform linux/amd64,linux/arm64 -t myapp:latest .

# ============================================
# TAG IMAGES
# ============================================

# Tag for Docker Hub
docker tag myapp:1.0 username/myapp:1.0
docker tag myapp:latest username/myapp:latest

# Tag for private registry
docker tag myapp:1.0 registry.example.com/myapp:1.0
docker tag myapp:1.0 registry.example.com:5000/myapp:1.0

# Tag with multiple tags
docker tag myapp:1.0 username/myapp:1.0
docker tag myapp:1.0 username/myapp:latest
docker tag myapp:1.0 username/myapp:stable

# ============================================
# PUSH IMAGES
# ============================================

# Push to Docker Hub (login first)
docker login
docker push username/myapp:1.0
docker push username/myapp:latest
docker push username/myapp --all-tags  # Push all tags

# Push to private registry
docker login registry.example.com
docker push registry.example.com/myapp:1.0

# ============================================
# REMOVE IMAGES
# ============================================

# Remove specific image
docker rmi myapp:1.0
docker image rm myapp:1.0
docker rmi -f myapp:1.0  # Force remove

# Remove multiple images
docker rmi myapp:1.0 nginx:latest ubuntu:22.04

# Remove by image ID
docker rmi abcdef123456

# Remove dangling images
docker image prune
docker image prune -f  # Force without confirmation
docker image prune -a  # Remove all unused images, not just dangling

# Remove all images
docker rmi $(docker images -q)
docker rmi -f $(docker images -q)  # Force remove all

# Remove images by filter
docker image prune -a --filter "until=24h"  # Images older than 24h
docker rmi $(docker images -f "dangling=true" -q)  # Remove dangling

# ============================================
# INSPECT IMAGES
# ============================================

# Detailed image info
docker inspect nginx:latest
docker inspect --format='{{.Os}}' nginx
docker inspect --format='{{.Config.Env}}' nginx
docker inspect --format='{{.ContainerConfig.Labels}}' nginx

# Show image history
docker history nginx:latest
docker history --no-trunc nginx:latest
docker history --format "table {{.ID}}\t{{.CreatedAt}}\t{{.CreatedBy}}" nginx

# Show image layers
docker image inspect --format='{{json .RootFS.Layers}}' nginx | jq

# ============================================
# SAVE AND LOAD IMAGES
# ============================================

# Save image to tar file
docker save -o myapp.tar myapp:1.0
docker save myapp:1.0 > myapp.tar
docker save myapp:1.0 nginx:latest | gzip > images.tar.gz

# Load image from tar file
docker load -i myapp.tar
docker load < myapp.tar
docker load < images.tar.gz

# Export container to tar (different from save)
docker export container_id > container.tar