# AI Adventure Engine

[中文文档](./README_zh.md)

---

> A dynamic, text-based adventure game engine powered by a Large Language Model (LLM). This application allows users to define a unique story context and then interact with an AI Game Master to experience a unique, procedurally generated narrative.

This project was bootstrapped with Vite and built using React, TypeScript, and Ant Design. It features a streaming, typewriter-style interface for an immersive user experience.

## ✨ Key Features

- **Dynamic Story Generation:** The narrative is generated in real-time by an LLM, based on player choices.
- **Configurable Context:** Users can provide their own story background, character details, and opening scene to create a unique adventure.
- **Streaming Interface:** Text from the AI Game Master appears with a typewriter effect, enhancing immersion.
- **Polite Auto-Scroll:** The page automatically scrolls to new content but stops if the user manually scrolls up to review history.
- **Responsive Design:** A clean, modern UI that works seamlessly on both desktop and mobile devices.
- **Separation of Concerns:** The application logic (frontend) is decoupled from the AI prompt engineering (Dify backend), allowing for a flexible and robust architecture.

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 6
- **Language:** TypeScript 5
- **UI Library:** Ant Design 5
- **Styling:** Styled-components & Sass
- **State Management:** Zustand
- **Routing:** React Router 6
- **HTTP Client:** Fetch API (for streaming)
- **Backend:** [Dify](https://dify.ai/) Cloud or self-hosted LLM platform.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- pnpm (or your package manager of choice like npm/yarn)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/ai-adventure-engine.git
    cd ai-adventure-engine
    ```

2.  **Install dependencies:**
    ```sh
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file:
    ```sh
    cp .env.example .env
    ```
    Now, open the `.env` file and add your Dify API URL and App Key:
    ```
    VITE_API_URL=https://your-dify-api-url/v1
    VITE_API_KEY=app-your-dify-app-key
    ```

4.  **Configure the Dify Workflow:**
    This application requires a specific prompt structure on the Dify backend. 
    - Go to your Dify application and create a **Chatflow**.
    - In the **LLM** node, paste the prompt provided in the `DIFY_PROMPT_TEMPLATE.md` file (or a similar one that separates story generation from structured choice generation).
    - Ensure the prompt uses a variable like `{{#sys.creative_prompt#}}` to receive the story context from the frontend.

5.  **Run the development server:**
    ```sh
    pnpm run dev
    ```
    Open your browser and navigate to the local URL provided (usually `http://localhost:5173`).

## 📖 How It Works

The application operates on a hybrid prompt model:

-   **Frontend:** Manages the UI, state, and a user-defined **Story Context** (e.g., world setting, character background).
-   **Dify Backend:** Contains a fixed **Engine Prompt** that defines the AI's core behavior, rules, and output format (story text, a separator, and a JSON object for choices).

On each turn, the frontend sends the player's action and the Story Context to the Dify API. Dify combines this with its Engine Prompt to generate the next part of the story in a predictable, structured stream, which the frontend then parses and displays.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.