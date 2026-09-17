# PK Books

Complete full-stack MVP for an online bookstore, stationery store, and printing marketplace.

## Run Locally

```bash
npm install
npm run dev
```

The current dev server is running at:

```text
http://localhost:3001
```

## Implemented

- Next.js, React, TypeScript and Tailwind CSS frontend.
- PWA manifest and SEO routes.
- Premium mobile-first storefront UI.
- Product search, category filters, cart interactions and wishlist affordance.
- School book package flow.
- Printing upload surface and dynamic print price calculator.
- Notebook customization preview.
- Admin dashboard for sales, orders, inventory and print jobs.
- REST-style API routes:
  - `GET /api/products`
  - `GET /api/orders`
  - `POST /api/print/quote`
- PostgreSQL production schema draft in `docs/postgres-schema.sql`.
- Backend architecture notes in `docs/architecture.md`.

## Production Integrations To Wire

- Razorpay order creation, payment verification and refunds.
- WhatsApp and email notification providers.
- Shipping provider adapter.
- S3-compatible file storage with signed URLs, scanning, previews and retention.
- NestJS service extraction if the backend is moved from Next route handlers into a dedicated API service.
