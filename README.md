# Invoice Manager

A simple invoicing application built with React, Vite, and Tailwind CSS.

## Features

- Create invoices with 7 interdependent fields (Qty, Price, Discount %, Discount, Tax %, Tax, Total Price)
- All fields are editable and automatically recalculate dependent values
- Inline editing of invoices in the grid
- Uses only 3 React useState hooks

## Local Development

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this project to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite and configure build settings
6. Click "Deploy"

Or use Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Build for Production

```bash
npm run build
```
