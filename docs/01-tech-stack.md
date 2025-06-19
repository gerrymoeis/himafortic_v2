# 01 - Technology Stack Decisions

This document outlines the finalized technology stack for the Himafortic Unesa website project. These choices were made to prioritize stability, developer experience, and long-term maintainability.

- **Package Manager:** `npm` will be used for dependency management.

## Frontend

- **Framework:** **Next.js 14.x**
  - **Reason:** Stable, excellent performance with Server-Side Rendering (SSR) for SEO, and modern features like the App Router.
- **UI Components:** **`shadcn/ui`**
  - **Reason:** Highly customizable and accessible components that are copied into the project, allowing for full control.
- **Styling:** **Tailwind CSS 3.x**
  - **Reason:** A utility-first CSS framework that is the foundation of `shadcn/ui` and allows for rapid, consistent styling.
- **Animations:** **Framer Motion 10.x / 11.x**
  - **Reason:** A powerful and easy-to-use animation library that integrates seamlessly with React/Next.js.
- **Form Management:** **`react-hook-form`** + **`zod`**
  - **Reason:** Provides a robust, type-safe, and performant solution for handling forms and validation.
- **Icons:** **`lucide-react`**
  - **Reason:** The default, recommended icon set for `shadcn/ui`. It's lightweight and tree-shakable.
- **Date Formatting:** **`date-fns`**
  - **Reason:** A modern, lightweight, and modular library for date manipulation.

## Backend & CMS

- **CMS (Headless):** **Strapi 4.x**
  - **Reason:** A mature, open-source headless CMS with a user-friendly interface, robust role-based access control, and strong community support.
- **Database:** **Supabase (PostgreSQL)**
  - **Reason:** A scalable, managed PostgreSQL database that integrates well with Strapi.
- **File Storage:** **Supabase Storage**
  - **Reason:** Provides a simple and effective object storage solution that can be connected to Strapi's media library via a dedicated provider plugin.

## Development Environment

- **Runtime:** **Node.js 20.x (LTS)**
  - **Reason:** The latest Long-Term Support version ensures stability, security, and access to modern JavaScript features.