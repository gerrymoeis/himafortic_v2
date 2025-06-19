# 04 - CMS Content Architecture

This document defines the structure of the content that will be managed in Strapi. These are the initial Content-Types to be created.

## Collection Types

### 1. Article
- **Purpose:** To manage news, blog posts, and announcements.
- **Fields:**
  - `title` (Text, Required, MinLength: 3)
  - `slug` (UID, from `title` field)
  - `content` (Rich Text, Required)
  - `coverImages` (Media, Multiple Images, max: 5)
  - `publishedDate` (Date, Required)
  - `author` (Relation, to `Functionary`)

### 2. Functionary (Pengurus)
- **Purpose:** To manage the profiles of organizational members.
- **Fields:**
  - `name` (Text, Required)
  - `position` (Text, Required, e.g., "Ketua Himpunan")
  - `photos` (Media, Multiple Images, max: 5)
  - `department` (Relation, to `Department`)

### 3. Department
- **Purpose:** To manage the different departments within Himafortic.
- **Fields:**
  - `name` (Text, Required, e.g., "Badan Pengurus Harian")
  - `description` (Text)
  - `logo` (Media, Single Image)

### 4. Gallery Item
- **Purpose:** To manage photos and videos for the gallery.
- **Fields:**
  - `title` (Text, Required)
  - `media` (Media, Multiple Images/Videos, max: 5)
  - `description` (Text)
  - `eventDate` (Date)

## Roles & Permissions
1.  **Public Role:** Will be granted `find` and `findOne` permissions for all created Content-Types to allow the Next.js frontend to fetch data.
2.  **Authenticated Roles (e.g., Editor, Author):** Will be configured within the Strapi admin panel to allow specific Himafortic members to manage content.