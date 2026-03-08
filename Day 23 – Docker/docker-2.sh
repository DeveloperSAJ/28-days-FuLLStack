# ============================================
# DOCKER COMPOSE - BASIC COMMANDS
# ============================================

# Start services
docker-compose up
docker-compose up -d  # Detached mode
docker-compose up --build  # Build images before starting
docker-compose up --scale web=3  # Scale services
docker-compose up --no-deps web  # Don't start linked services

# Stop services
docker-compose down
docker-compose down -v  # Remove volumes
docker-compose down --rmi all  # Remove images
docker-compose down --remove-orphans  # Remove unused containers

# Build
docker-compose build
docker-compose build --no-cache
docker-compose build --parallel
docker-compose build web  # Build specific service

# Start/Stop
docker-compose start
docker-compose stop
docker-compose stop web  # Stop specific service
docker-compose restart
docker-compose restart web

# Pause/Unpause
docker-compose pause
docker-compose unpause

# ============================================
# LOGS AND MONITORING
# ============================================

docker-compose logs
docker-compose logs -f  # Follow
docker-compose logs --tail=100 web
docker-compose logs -f --tail=0 web
docker-compose ps
docker-compose top
docker-compose events

# ============================================
# EXECUTE COMMANDS
# ============================================

docker-compose exec web bash
docker-compose exec -u root web whoami
docker-compose exec -w /app web ls -la
docker-compose run web npm test  # Run one-off command
docker-compose run --rm web npm install  # Run and remove

# ============================================
# CONFIGURATION
# ============================================

docker-compose config  # Validate and view config
docker-compose config --services
docker-compose config --volumes
docker-compose config --quiet  # Only check syntax

# ============================================
# IMAGES AND CONTAINERS
# ============================================

docker-compose images
docker-compose pull  # Pull service images
docker-compose push  # Push service images
docker-compose rm  # Remove stopped containers
docker-compose rm -f  # Force remove
docker-compose rm -v  # Remove volumes

# ============================================
# NETWORKING
# ============================================

docker-compose port web 8080  # Print public port
docker-compose run --service-ports web  # Use service ports

# ============================================
# SCALING
# ============================================

docker-compose up --scale web=5 -d
docker-compose scale web=3 worker=2

# ============================================
# ENVIRONMENT
# ============================================

docker-compose run -e VAR=value web env
docker-compose run --env-file .env web env

# ============================================
# COMPLETE DOCKER-COMPOSE.YML EXAMPLE
# ============================================