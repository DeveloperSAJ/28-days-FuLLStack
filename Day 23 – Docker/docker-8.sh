# ============================================
# INSTALLATION (Ubuntu/Debian)
# ============================================

# Update package index
sudo apt-get update

# Install prerequisites
sudo apt-get install ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Verify installation
docker --version
docker compose version
sudo docker run hello-world

# Post-installation (run docker without sudo)
sudo usermod -aG docker $USER
newgrp docker

# Start on boot
sudo systemctl enable docker.service
sudo systemctl enable containerd.service

# Check Docker status
sudo systemctl status docker
sudo systemctl start docker
sudo systemctl stop docker
sudo systemctl restart docker

# ============================================
# WINDOWS INSTALLATION
# ============================================
# Download Docker Desktop from https://www.docker.com/products/docker-desktop
# Run installer
# Enable WSL2 integration if desired

# ============================================
# MACOS INSTALLATION
# ============================================
# Download Docker Desktop for Mac from https://www.docker.com/products/docker-desktop
# Drag to Applications folder
# Open Docker Desktop