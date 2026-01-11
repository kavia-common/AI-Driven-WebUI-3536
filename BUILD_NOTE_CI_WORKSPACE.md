To the CI runner/operator:

This repository contains multiple containers. The frontend app's package.json is located under:
AI-Driven-WebUI-3536/

If you run npm/yarn/pnpm commands from the repository root, you will see ENOENT errors like:
ENOENT: no such file or directory, open '/home/kavia/workspace/code-generation/package.json'

Please execute build steps from the correct working directory:
cd AI-Driven-WebUI-3536
npm install
npm run build

This project has been validated to build successfully when executed from AI-Driven-WebUI-3536 (vite + vue-tsc + vite build complete).
