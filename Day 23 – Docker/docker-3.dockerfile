# ============================================
# DOCKERFILE COMPLETE REFERENCE
# ============================================

# ----------------------------
# FROM - Base image
# ----------------------------
FROM ubuntu:22.04
FROM python:3.11-slim
FROM node:20-alpine
FROM nginx:alpine
FROM openjdk:17-jdk-slim
FROM golang:1.21
FROM mongo:6.0
FROM mysql:8.0
FROM redis:7-alpine
FROM scratch  # Empty image

# ----------------------------
# LABEL - Metadata
# ----------------------------
LABEL maintainer="developer@example.com"
LABEL version="1.0.0"
LABEL description="Production backend application"
LABEL org.opencontainers.image.source="https://github.com/user/repo"
LABEL org.opencontainers.image.licenses="MIT"

# ----------------------------
# WORKDIR - Working directory
# ----------------------------
WORKDIR /app
WORKDIR /usr/src/app
WORKDIR /home/node/app

# ----------------------------
# COPY - Copy files
# ----------------------------
COPY . .
COPY package*.json ./
COPY --chown=node:node package.json ./
COPY --chmod=755 entrypoint.sh /entrypoint.sh
COPY --from=builder /app/dist /app/dist
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY ["file with spaces.txt", "/path/"]

# ----------------------------
# ADD - Copy with extra features
# ----------------------------
ADD . /app
ADD https://example.com/file.tar.gz /tmp/
ADD file.tar.gz /tmp/  # Auto-extract
ADD --chown=node:node --chmod=755 script.sh /usr/local/bin/

# ----------------------------
# RUN - Execute commands
# ----------------------------
# Shell form
RUN apt-get update
RUN apt-get install -y python3 python3-pip
RUN npm install
RUN pip install -r requirements.txt

# Exec form
RUN ["apt-get", "update"]
RUN ["npm", "install", "--production"]

# Multiple commands
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    vim \
    && rm -rf /var/lib/apt/lists/*

# ----------------------------
# ENV - Environment variables
# ----------------------------
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL=postgresql://user:pass@db:5432/app
ENV REDIS_URL=redis://redis:6379
ENV PATH="/app/bin:${PATH}"

# ----------------------------
# ARG - Build arguments
# ----------------------------
ARG VERSION
ARG COMMIT_SHA
ARG DEBIAN_FRONTEND=noninteractive
ENV APP_VERSION=$VERSION
ENV GIT_COMMIT=$COMMIT_SHA

# ----------------------------
# EXPOSE - Document ports
# ----------------------------
EXPOSE 3000
EXPOSE 8080
EXPOSE 80 443

# ----------------------------
# USER - User management
# ----------------------------
# Debian/Ubuntu
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
USER appuser

# Alpine
RUN addgroup -g 1001 -S appgroup && adduser -S appuser -u 1001 -G appgroup
USER appuser:appgroup

# Node image
USER node

# ----------------------------
# VOLUME - Mount points
# ----------------------------
VOLUME ["/data"]
VOLUME /var/log /var/cache
VOLUME /app/uploads

# ----------------------------
# HEALTHCHECK - Container health
# ----------------------------
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

HEALTHCHECK --interval=5s --timeout=2s --start-period=10s \
  CMD pgrep node || exit 1

HEALTHCHECK NONE  # Disable healthcheck

# ----------------------------
# ENTRYPOINT - Main command
# ----------------------------
# Exec form (preferred)
ENTRYPOINT ["docker-entrypoint.sh"]
ENTRYPOINT ["/entrypoint.sh"]
ENTRYPOINT ["python", "app.py"]

# Shell form
ENTRYPOINT docker-entrypoint.sh

# ----------------------------
# CMD - Default arguments
# ----------------------------
# Exec form
CMD ["node", "server.js"]
CMD ["npm", "start"]
CMD ["python", "app.py"]
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]

# Shell form
CMD node server.js
CMD python app.py

# CMD as default arguments to ENTRYPOINT
ENTRYPOINT ["/entrypoint.sh"]
CMD ["app"]

# ----------------------------
# ONBUILD - Triggers for child builds
# ----------------------------
ONBUILD COPY . /app
ONBUILD RUN npm install
ONBUILD COPY --from=builder /app/dist /app/dist

# ----------------------------
# STOPSIGNAL - Stop signal
# ----------------------------
STOPSIGNAL SIGQUIT
STOPSIGNAL SIGTERM

# ----------------------------
# SHELL - Default shell
# ----------------------------
SHELL ["/bin/bash", "-c"]
SHELL ["/bin/sh", "-c"]

# ----------------------------
# MULTI-STAGE BUILD EXAMPLE
# ----------------------------
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- localhost || exit 1
CMD ["nginx", "-g", "daemon off;"]