# Phase 7: Demo Data, Testing, and UX Polish

This plan covers generating realistic demo data, establishing a strict testing protocol for the dashboard, and implementing skeleton loading states for a seamless UX.

## 1. Demo Data Generation (`prisma/seed-demo.ts`)
I will create a comprehensive seed script that populates the database with high-quality, realistic interior design data so the frontend looks stunning immediately.
- **Categories**: "Residential", "Commercial", "Hospitality", "Minimalist".
- **Services**: 4 premium services (e.g., "Full-Service Interior Design", "3D Rendering") complete with bullet-point features.
- **Projects**: 6-8 high-end projects using beautiful placeholder imagery (via direct Unsplash URLs), with varied statuses (`PUBLISHED`, `DRAFT`) and `featured` flags.
- **Site Settings**: Populate the global settings with dummy agency contact info.

## 2. Dashboard Testing Protocol
I will create and execute an automated test script (`test-dashboard-crud.ts`) that will interact directly with our Next.js Server Actions to ensure every piece of the dashboard's data layer works perfectly. 
The test plan will verify:
- **Projects**: Can we create, read, update, and delete a Project? Does slug generation work?
- **Services**: Can we create, read, update, and delete a Service (including the dynamic features array)?
- **Categories**: Can we create and delete Categories?
- **Settings**: Can we update global site settings?
*(I will run this script myself and verify the database outputs).*

## 3. Loading & Skeleton Screens
Server Components can sometimes take a moment to fetch data from the database. I will implement Next.js `loading.tsx` files across the dashboard using the Shadcn `<Skeleton />` component.
- `dashboard/projects/loading.tsx` (Table skeleton)
- `dashboard/services/loading.tsx` (Table skeleton)
- `dashboard/categories/loading.tsx` (Split-view skeleton)
- `dashboard/media/loading.tsx` (Grid skeleton)

## User Review Required

> [!NOTE]
> The demo data script will **clear existing projects and categories** to ensure a clean state. Since this is a brand new database, this should be fine, but please confirm you are okay with wiping any manual test data you just entered!

## Verification Plan
1. Run `npx tsx prisma/seed-demo.ts` and verify the storefront immediately populates with luxury content.
2. Run `npx tsx test-dashboard-crud.ts` and verify all CRUD operations pass perfectly.
3. Build the project and navigate the dashboard to visually verify the Skeleton loading states.
