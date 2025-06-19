# 02 - Design & UI/UX Brief

This document translates the Himafortic identity into a concrete design plan to guide UI/UX development.

## Core Identity

- **Keywords:** Modern, professional, innovative, welcoming, clean.
- **Target Audience:** Current students, prospective students, university faculty, and external partners.

## Mini Style Guide

### Color Palette
The official color palette is derived from the Himafortic logo.

- **Primary Action Color:** `var(--tango)` - #ec7b24 (For buttons, important links)
- **Secondary Action Color:** `var(--curious-blue-2)` - #1babdd (For secondary actions, highlights)
- **Primary Text & Headings:** `var(--bay-of-many)` - #2e3c85
- **Accent/Highlight:** `var(--fuel-yellow)` - #ecac16
- **Neutrals:** Standard grays/slates for body text, backgrounds, and borders.

### Typography
- **Primary Font:** 'Tomorrow', a modern, monospace-style sans-serif.
- **Google Font Import:** To use this font, include the following in your global CSS:
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Tomorrow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  ```
- **Scale:**
  - **H1:** 36px, Bold
  - **H2:** 28px, Bold
  - **H3:** 24px, Semi-Bold
  - **Body:** 16px, Regular
  - **Captions/Small Text:** 14px, Regular

### Spacing & Layout
- A consistent 8px grid system will be used. Spacing values (margin, padding) will be multiples of 8px (e.g., 8px, 16px, 24px, 32px).
- Page layouts will be clean, with ample white space to improve readability.

## Animation Philosophy

Animations should be purposeful and enhance the user experience, not distract from it.

- **Page Transitions:** Subtle fade transitions.
- **Scroll Animations:** Gentle fade-in or slide-in effects for content sections.
- **Micro-interactions:** Smooth hover effects on interactive elements to provide clear visual feedback.

## Wireframing
Low-fidelity wireframes will be created for the following key pages before development begins to solidify layout and content hierarchy:
- Homepage
- About Us
- Organizational Structure
- News (List View & Detail View)
- Contact Page

## Collaborative Design Process

To ensure the final design is precise and structured, we will follow a collaborative process:

1.  **Concept Generation (Cascade):** For each key page (starting with the Homepage), Cascade will provide a structured, high-level design concept describing the layout, components, and user flow.
2.  **Detailed Brief Creation (User):** The user will take these concepts and use them to generate a detailed, structured JSON file that specifies the exact design system, component properties, and layout details.
3.  **Implementation (Cascade):** Cascade will use this JSON file as the single source of truth for implementing the frontend UI, ensuring a 1:1 match with the user's vision.