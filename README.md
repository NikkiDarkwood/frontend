# TODO: Update the README.md file

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



# SAMBA - AWS Customer Management Tool

SAMBA is a web-based tool designed to help you manage and systemize AWS customer information. Built using PostgreSQL, Flask for the backend, and React with Next.js for the frontend, this application provides an easy-to-use interface for onboarding and offboarding AWS customers.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)

## Features

- **Onboard Customers**: Add new AWS customers to the system with their details.
- **Offboard Customers**: Remove customers from the system.
- **Search Functionality**: Quickly find customers using a search function on the home page.
- **Navigation Bar**: Navigate between different pages easily.

## Technology Stack

- **Frontend**: React with Next.js (TypeScript)
- **Backend**: Flask (Python)
- **Database**: PostgreSQL
- **Admin Interface**: pgAdmin
- **CSS Framework**: Tailwind CSS (optional)
- **State Management**: React Hooks

## Project Structure

The project is divided into two main parts: the frontend and the backend.

```plaintext
├── backend
│   ├── app.py (Flask application entry point)
│   ├── models.py (Database models for PostgreSQL)
│   ├── routes.py (API routes for onboarding and offboarding)
│   └── ...
├── frontend
│   ├── src
│   │   ├── pages
│   │   │   ├── index.tsx (Home page with search functionality)
│   │   │   ├── onboard.tsx (Onboard customer page)
│   │   │   ├── offboard.tsx (Offboard customer page)
│   │   │   └── _app.tsx (Custom app configuration for Next.js)
│   │   ├── components
│   │   │   └── Layout.tsx (Navigation bar layout component)
│   │   └── ...
├── README.md
└── ...
