# Agency Platform Core Changelog

All notable changes to the Core Platform will be documented in this file.

## [1.0.0] - 2026-07-20

### Added
- Initial project scaffolding with Next.js App Router, Tailwind CSS, and shadcn/ui.
- Prisma schema matching the platform architecture (Users, Settings, Projects, Services, Categories, Gallery, Testimonials, FAQs, SEO, Media).
- Configured `.env.example` with Neon PostgreSQL, NextAuth, and Cloudinary placeholders.
- Established strict `core/` vs `design/` folder structure boundary.
- Created `site.config.ts` for per-client feature flags and configuration.
