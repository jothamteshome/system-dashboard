# Status Dashboard

Personal status page for [status.whymighta.net](https://status.whymighta.net) — displays live health for Minecraft servers, web projects, and Docker containers.

Built with Vite + React + TypeScript + Tailwind CSS. Data is fetched from the [status-api](../infra-hub/lambdas/status-api/) Lambda, polling every 60 seconds.

## Sections

- **Minecraft Servers** — online/offline, player count, version, latency
- **Sites** — HTTP health for static sites and the watch-together app (frontend + backend)
- **Docker Containers** — CPU, memory, net I/O, block I/O, uptime per container

## Development

```bash
npm install
npm run dev
```

Create `.env.local` with:
```
VITE_APP_STATUS_API_URL=/api
```

The dev server proxies `/api` to `https://api.status.whymighta.net` to avoid CORS.

## Deployment

Deployed automatically to S3 + CloudFront via GitHub Actions on push to `main`.

Required GitHub secrets: `AWS_STATIC_SITE_ROLE_TO_ASSUME`, `HOSTED_ZONE_NAME`, `HOSTED_ZONE_ID`
Required GitHub variables: `DOMAIN_NAME`, `VITE_APP_STATUS_API_URL`

