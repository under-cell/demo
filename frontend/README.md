# Frontend (Vue.js + Vite)

This directory contains the frontend Vue.js application.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Development Server

```bash
npm run dev
```

The frontend will typically be available at `http://localhost:5173`.

## Communication with Backend

*   The frontend makes requests to the backend API (running typically on `http://localhost:3001`).
*   Ensure the backend server is running.
*   The backend `server.js` includes CORS configuration (`cors({ origin: '*' })`) to allow requests from any origin during development. **For production, restrict the origin to your frontend's domain.**
*   Alternatively, you can uncomment and configure the `proxy` setting in `frontend/vite.config.js` to route requests like `/api/generate` from the Vite dev server to your backend, avoiding direct cross-origin requests from the browser.

## Building for Production

```bash
npm run build
```

This will create a `dist` directory with the optimized production assets. 