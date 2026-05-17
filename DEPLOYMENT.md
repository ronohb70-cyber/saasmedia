# Deployment Guide

This guide outlines how to deploy the Social SaaS platform into a production environment.

## 1. Environment Preparation
Copy `.env.example` to `.env` and fill in all the production secrets.
- Use a strong, randomly generated `JWT_SECRET`.
- Obtain the remote database URI (e.g. from AWS RDS or Supabase) for `DATABASE_URL`.
- Obtain Redis credentials (e.g. from Upstash or AWS ElastiCache).

## 2. CI/CD Integration
The project is configured with GitHub actions in `.github/workflows/ci.yml`. This automatically runs linting and builds on every push to the `main` branch.

## 3. Deploying using Docker
The monorepo uses a multi-stage Dockerfile that leverages `turbo prune` to create highly optimized containers.

### Building the API
```bash
docker build -t social-api --build-arg APP_NAME=api .
docker run -p 3001:3001 --env-file .env social-api
```

### Building the Worker
```bash
docker build -t social-worker --build-arg APP_NAME=worker .
docker run --env-file .env social-worker
```

### Building the Web Frontend
```bash
docker build -t social-web --build-arg APP_NAME=web .
docker run -p 3000:3000 --env-file .env social-web
```

## 4. Production Recommendations
- **Load Balancer**: Place the `api` and `web` containers behind an NGINX reverse proxy or an AWS Application Load Balancer.
- **SSL**: Ensure all traffic is routed through HTTPS.
- **Database Migrations**: Always run `npx prisma db push` or `npx prisma migrate deploy` before spinning up the new API container version.
