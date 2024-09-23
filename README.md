This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

# Library Management System

This is a Library Management System built with Next.js. The application allows users to view, borrow, and return books. It also includes authentication features such as login and logout.

## Features

- View available books
- Borrow books
- Return borrowed books
- View borrowed book history
- User authentication (login and logout)

## Technologies Used

- Next.js
- React
- JavaScript
- CSS
- `react-toastify` for notifications
- `js-cookie` for cookie management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

### Install dependencies:

    npm install
    # or
    yarn install

### Configuration
    NEXT_PUBLIC_API_URL=http://your-api-url.com

### Project Structure

    pages/: Contains the Next.js pages.
    index.js: The home page.
    book.js: The page to view and borrow books.
    borrowed.js: The page to view borrowed book history.
    api/: Contains API route handlers.
    components/: Contains reusable React components.
    services/: Contains API service functions.
    styles/: Contains CSS files.
    API Endpoints
    GET /api/get-book: Fetches the list of available books.
    POST /api/borrow-book: Borrows a book.
    POST /api/return-book: Returns a borrowed book.
    POST /api/borrow-history: Fetches the borrow history.
