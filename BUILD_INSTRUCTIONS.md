# Build Instructions for AI-Driven-WebUI-3536

This project is a multi-container repository. The frontend app (Vue 3 + Vite) lives under the `AI-Driven-WebUI-3536` directory.

To install dependencies and build the app, run commands from this directory:

```bash
cd AI-Driven-WebUI-3536
npm ci --no-audit --no-fund
npm run build
```

Common CI pitfall:
- Running `npm install && npm run build` from the repo root will fail with ENOENT (no package.json). Ensure the working directory is `AI-Driven-WebUI-3536` before invoking npm.
