# Backend (Node.js + Express + OpenAI)

This directory contains the backend server code.

## Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    *   Rename or copy `.env.example` to `.env`.
    *   Open the `.env` file and replace `YOUR_OPENAI_API_KEY_HERE` with your actual OpenAI API key.

## Running the Server

*   **Development Mode (with auto-reload using nodemon):**
    ```bash
    npm run dev
    ```
    The server will typically start on `http://localhost:3001` (or the port specified in `.env`).

*   **Production Mode:**
    ```bash
    npm start
    ```

## API Endpoint

*   `POST /api/generate`
    *   Expects a JSON body with a `prompt` field:
        ```json
        {
          "prompt": "Write a catchy slogan for a new coffee shop."
        }
        ```
    *   Returns a JSON response with the generated text:
        ```json
        {
          "generatedText": "Your daily grind just got an upgrade."
        }
        ``` 