# Project Development Decisions

This document records the key decisions made during the initial project discussion on 2025-06-17.

## 1. Features

The website will include the following core features:

- **Homepage:** Welcome section, brief Visi/Misi, and activity highlights.
- **About Us Page:** Detailed history, vision, mission, and logo philosophy.
- **Organizational Structure Page:** Introduction to each department and its functionaries.
- **News/Articles/Blog:** For publishing activities and updates.
- **Contact Page:** Contact information and social media links.

### Additional Features

- **Photo/Video Gallery:** A dedicated section to showcase event documentation.
- **CMS Dashboard (Crucial):** A role-based Content Management System for functionaries to manage website content. This requires research into a suitable free, fully-featured, and customizable Headless CMS.

## 2. Backend and Database

- **Database:** We will use Supabase as the primary database.
- **Data to be Managed:** Nearly all frontend data will be dynamic and managed through the database, including: 
  - Functionary lists (pengurus)
  - Work programs (program kerja)
  - Program work documents
  - Blog articles
  - Gallery content (photos/videos)

## 3. UI/UX and Design

- **Overall Goal:** A modern UI/UX with smooth, performant animations and excellent SEO.
- **Animation Library:** We will use `Framer Motion` for animations like parallax, hover effects, etc.
- **UI Component Library:** We will continue to use `shadcn/ui` for its customizability.
- **Styling Elements:** To enhance uniqueness and performance, we will utilize SVG animations and pure CSS animations.
- **Color Palette:** The primary colors are blue and orange, complemented by a broader palette derived from the Himafortic logo:

  ```css
  /* CSS HEX */
  --tango: #ec7b24;
  --fuel-yellow: #ecac16;
  --bay-of-many: #2e3c85;
  --azure-1: #3c56a6;
  --curious-blue-1: #288dca;
  --curious-blue-2: #1babdd;
  --mariner: #2c77ba;
  --azure-2: #3364ae;
  --korma: #913e0c;
  --buttercup: #f4ac24;
  ```

## 4. General

- **Language:** The primary language of the website will be Bahasa Indonesia.
