# Agency Platform Core - Dashboard Overhaul

Based on the screenshot you shared, the Dashboard's global styling broke (falling back to Times New Roman) and the sidebar looks a bit chaotic. I will overhaul the dashboard to make it look incredibly clean, professional, and responsive. 

## Proposed Changes

### 1. Fix Global Typography & Resets
- **Bug Fix**: The `--font-sans` variable in `globals.css` is misconfigured in Tailwind v4. I will point it to the correct Next.js font variable (`--font-geist-sans` or `Inter`). This will instantly fix the "Times New Roman" issue across the entire dashboard.
- **Backgrounds**: Set a very subtle off-white/gray background for the dashboard (`bg-muted/30`) so the white Cards pop perfectly.

### 2. Premium Sidebar (`AppSidebar.tsx`)
- Enhance the sidebar to feel like a modern SaaS product (e.g. Vercel or Stripe).
- Add a sleek "StudioCore" logo area at the top.
- Fix the icon alignment so they sit perfectly inline with the menu text.
- Add distinct hover and active states (highlighting the page you are currently on).
- Add a "Logout" button at the bottom of the sidebar.

### 3. Responsive Form Layouts
- The CRUD forms (like the "New Project" form in your screenshot) are currently stretching across the entire width of the screen on desktop.
- I will constrain them to a readable width (e.g., `max-w-5xl mx-auto`) and center them.
- I'll add subtle padding and shadows to the Cards to make the inputs feel more contained and structured.

### 4. Header & Breadcrumbs (`AppHeader.tsx`)
- Enhance the top header. Alongside the Sidebar Trigger (for mobile), I will add breadcrumb navigation (e.g., `Dashboard > Projects > New`) or a dynamic page title so you always know where you are.

## User Review Required

Does this plan for cleaning up the dashboard sound good? I will make it look like a state-of-the-art SaaS interface!

## Verification Plan
- Run `npm run dev` and navigate to `/dashboard` to visually verify the fonts, sidebar layout, and form constraints.
- Test resizing the window to ensure the sidebar collapses properly on mobile and the forms remain readable.
