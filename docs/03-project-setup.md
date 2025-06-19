# 03 - Project Setup Roadmap

This document provides a detailed, step-by-step guide for preparing the development environment. Using specific versions ensures a stable and predictable setup, minimizing potential issues from breaking changes.

## 1. Global Prerequisites
- **Node.js:** Version `20.11.0` (LTS). The Long-Term Support version is crucial for stability and security.
- **npm:** Version `10.2.4` or later (comes with Node.js).
- **Git:** Latest version installed for version control.

## 2. Repository & Workspace Setup
*This foundational step organizes the project into a clean monorepo-style structure, separating the frontend and backend concerns.*

1.  **Create Project Root:** Create a main directory (e.g., `himafortic-web`).
2.  **Initialize Git:** Run `git init` to start version tracking.
3.  **Create `.gitignore`:** Add a standard `Node.js` gitignore file to exclude `node_modules` and other unnecessary files from the repository.
4.  **Create Subdirectories:** Create two folders: `frontend` and `cms`.

## 3. Frontend Setup (in `frontend` directory)
*This section sets up the Next.js application, which will be the user-facing website.*

1.  **Initialize Next.js:**
    ```bash
    # Using a specific stable version of Next.js ensures consistency.
    npm create next-app@14.2.3 .
    ```
2.  **Initialize `shadcn/ui`:**
    ```bash
    # This CLI tool sets up Tailwind CSS and required utilities for our component library.
    npx shadcn@latest init
    ```
3.  **Install Dependencies:**
    ```bash
    # Install specific, stable versions of our core libraries.
    npm install framer-motion@11.2.10 react-hook-form@7.51.5 @hookform/resolvers@3.3.4 zod@3.23.8 lucide-react@0.395.0 date-fns@3.6.0
    ```
4.  **Environment Variables:** Create a `.env.local` file for client-side environment variables (e.g., `NEXT_PUBLIC_STRAPI_API_URL`, `NEXT_PUBLIC_STRAPI_API_TOKEN`). Add a `.env.example` file to document these for other developers.

## 4. CMS Setup (in `cms` directory)
*This section sets up Strapi, our headless CMS for managing all website content.*

1.  **Initialize Strapi:**
    ```bash
    # The create-strapi-app command fetches the latest stable v4 release.
    npx create-strapi-app@4.24.0 . --quickstart
    ```
2.  **Install Dependencies for Supabase Integration:**
    ```bash
    # `pg` is the PostgreSQL driver Strapi needs to communicate with Supabase.
    # `strapi-provider-upload-supabase` connects the media library to Supabase Storage.
    npm install pg@8.12.0 strapi-provider-upload-supabase@1.1.0
    ```
3.  **Configure Database (`config/database.js`):**
    - **Why:** To switch Strapi's default SQLite database to our powerful, cloud-based Supabase (PostgreSQL) database.
    - **How:** Create the file and populate it with your Supabase database credentials, loading them securely from a `.env` file.
4.  **Configure File Storage (`config/plugins.js`):**
    - **Why:** To ensure that any files uploaded to the CMS (like images) are stored in our Supabase Storage bucket instead of the local server.
    - **How:** Create the file and configure the `strapi-provider-upload-supabase` plugin with your Supabase URL, API key, and bucket name from `.env`.
5.  **Configure Middlewares (`config/middlewares.js`):**
    - **Why:** To adjust the Content Security Policy (CSP). This is a security measure that tells the browser which sources are safe to load content from. We must add our Supabase Storage URL so the Strapi admin panel can display images hosted there.
    - **How:** Find the `strapi::security` middleware configuration and add your Supabase domain to the `img-src` directive.
6.  **Environment Variables:** Create a `.env` file for all backend credentials (database connection string, Supabase keys, JWT secret, etc.). Add a `.env.example` file.