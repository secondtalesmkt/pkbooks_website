# PK Books Platform Architecture

PK Books is structured as a scalable ecommerce and online printing ecosystem. This repository currently contains a runnable Next.js full-stack MVP with REST route handlers, shared domain modules, and a UI that models customer, staff, and admin workflows.

## Production Backend Target

- API: NestJS modules for auth, catalog, schools, cart, checkout, orders, printing, files, payments, shipping, notifications, marketing, and admin.
- Database: PostgreSQL with row-level ownership for customers, staff permissions for print jobs, and audit trails for payments and order transitions.
- Storage: S3-compatible object storage with signed URLs, malware scanning, preview generation, retention policy, and automatic deletion after completion.
- Payments: Razorpay order creation, signature verification, refunds, transaction ledger, COD reconciliation.
- Notifications: WhatsApp templates and email templates triggered by domain events.
- Shipping: Adapter interface for Shiprocket, Delhivery, India Post, or local delivery staff.

## Domain Modules

- Catalog: products, categories, stock, SKU, GST, media, reviews, Merchant Center feed.
- School Packages: schools, classes, academic years, subjects, required books, one-click cart creation.
- Printing: file intake, quote rules, document printing, photo printing, notebook designer, custom products.
- Orders: ecommerce orders, print jobs, invoices, status tracking, refunds and cancellations.
- Admin: dashboards, products, inventory, customers, staff roles, pricing rules and workflow boards.
- Marketing: coupons, campaigns, student offers, referrals, loyalty points.
- Future: POS billing, branches, franchises, ERP sync, AI chatbot and recommendations.
