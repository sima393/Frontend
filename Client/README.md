# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Running the project for review

To make this easy for your supervisor, use the fixed URL and the helper script below.

1. Open PowerShell in `React-frontend\Client`
2. Run this command:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-dev.ps1
```

3. After startup, open this fixed URL in a browser:

- http://127.0.0.1:5173/

This command ensures the backend and frontend start correctly and that the React app is served on a stable IPv4 address, avoiding blank page issues from stray servers or `localhost`/IPv6 mismatches.
