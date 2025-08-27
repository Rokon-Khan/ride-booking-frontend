# Ride Booking System Frontend

![Ride Booking System](https://i.ibb.co.com/jPp37rCF/Ride-Sahring-Pro-Fetures-Image.jpg)

## Live deployment Link: https://ride-sharing-pro.netlify.app

## Overview

This is the frontend application for a Ride Booking Platform, similar to Uber or Pathao. It provides a production-grade, fully responsive, and role-based user interface for Riders, Drivers, and Admins. The app interacts with a backend API (via REST endpoints) to handle authentication, ride management, user oversight, and analytics.

The application supports public landing pages for unauthenticated users, secure JWT-based authentication, and tailored dashboards for each role. It emphasizes polished UX with responsive design, data visualizations, real-time-like updates (via polling), and safety features like an SOS button.

Live Demo: [https://ride-sharing-pro.netlify.app/](https://ride-sharing-pro.netlify.app)

GitHub Repository: [https://github.com/Rokon-Khan/ride-booking-frontend](https://github.com/Rokon-Khan/ride-booking-frontend)

### Testing Credentials

- **Admin**: Email: `admin@admin.com`, Password: `Pass@135`
- **Driver**: Email: `rokonjust@gmail.com`, Password: `Pass@135`
- **Rider**: Email: `rokonjust@gmail.com`, Password: `Pass@135`

**Note**: Driver and Rider share the same email for testing purposes, but roles are distinguished during login/registration. Use the role selection in registration for new accounts.

## Features

The application implements all core requirements for a ride booking system, including responsive UI, role-based access, and enhanced safety/security measures.

### 1. Responsive Design & Visual Consistency

- Fully responsive layout optimized for mobile, tablet, and desktop using Tailwind CSS utility classes.
- Consistent typography, spacing, color palette, and UI components via Shadcn UI.
- Sticky navigation bar with at least 6 menu options (Home, About, Features, Contact, FAQ, Login/Register) and a profile dropdown for authenticated users.
- Complementary footer with functional links to public pages, social media, and contact info.
- Performance optimizations: Lazy-loading for heavy components (e.g., maps, charts), skeleton loaders for API fetches, and accessibility compliance (ARIA labels, semantic HTML).
- No placeholder text; populated with realistic data for a professional finish.

### 2. Public Landing Pages (Accessible Without Authentication)

- **Home Page**: At least 5 distinct sections including Hero Banner (call-to-action for sign-up), How-It-Works Overview, Service Highlights (e.g., safe rides, affordable fares), Customer Testimonials, and Promotions/Special Offers.
- **About Us**: Company background, mission statement, and team profiles.
- **Features**: Detailed breakdown of capabilities for Riders (e.g., easy booking), Drivers (e.g., earnings tracking), and Admins (e.g., analytics).
- **Contact**: Validated form for inquiries (simulated or API-submitted; includes name, email, message fields with error handling).
- **FAQ**: Searchable accordion list of common questions (e.g., "How do I request a ride?").

### 3. Authentication & Authorization

- JWT-based registration and login with role selection (Rider or Driver; Admin is pre-seeded).
- Registration form includes role dropdown, email, password, and profile details (name, phone).
- Optional: Google/Facebook login integration (if implemented, handles roles appropriately).
- Role-based redirects post-login (e.g., Rider to /rider/dashboard).
- **Account Status Handling**:
  - Blocked or suspended users redirected to a status page with resolution instructions (e.g., contact support).
  - Offline drivers can access dashboards but see notices instead of ride request features; prompts to toggle online.
- Persistent authentication across sessions using localStorage/Redux.
- Logout functionality clears session and redirects to home.

### 4. Rider Features

- **Ride Request Form**: Fields for pickup/destination (with lat/lng and address), fare estimation (via API), and payment method selection. Includes validation and toast notifications.
- **Live Ride Tracking** (Optional): Real-time updates on ongoing rides with driver details and map integration (polling current ride endpoint; uses Leaflet or similar for route visualization).
- **Ride History**: Paginated table/list with search and filters (by date, fare range, status). Supports sorting and infinite scrolling.
- **Ride Details Page**: Displays map route (optional), timestamps, driver info, and status timeline.
- **Profile Management**: Edit name, phone number, and change password with form validation.
- **Cancel Ride**: Option to cancel pending/ongoing rides with confirmation.

### 5. Driver Features

- **Availability Control**: Toggle switch for online/offline status; affects visibility of incoming requests.
- **Incoming Requests**: List of available rides with accept/reject buttons; real-time polling if online.
- **Active Ride Management**: Update ride statuses (e.g., Accepted → Picked Up → In Transit → Completed) or cancel.
- **Earnings Dashboard**: Visual breakdowns (daily, weekly, monthly) using Recharts (bar/pie charts) for earnings trends.
- **Ride History**: Paginated and filterable list of past rides.
- **Profile Management**: Update vehicle details (make, model, license), contact info, and password.

### 6. Admin Features

- **User Management**: Searchable/filterable list of users; actions to block/unblock riders.
- **Driver Management**: List all drivers; approve, suspend, or reactivate with status updates.
- **Ride Oversight**: View all rides with advanced filters (date, status, driver/rider); update status or delete rides.
- **Analytics Dashboard**: Data visualizations (Recharts) for ride volume, revenue trends, user activity, and driver performance from reports API.
- **Search & Filter Tools**: Consistent across listing pages (e.g., tables with pagination, search bars).
- **Profile Management**: Update personal details and password.

### 7. General UI/UX Enhancements

- Role-based navigation with profile dropdown (e.g., View Profile, Change Password, Logout).
- Interactive elements: Carousels for testimonials, dynamic ride cards, responsive charts.
- Smooth transitions, skeleton loaders, and global error handling for better performance.
- No broken links or non-functional buttons.
- Data visualization: Cards, bar charts, pie charts, and tables dynamically updated via API data.
- **Emergency/SOS Button**:
  - Floating button on active ride screens for riders/drivers.
  - On click: Options to call police, notify emergency contacts, or share live location (using `navigator.geolocation`).
  - Pre-set contacts editable in settings; sends notifications via tel:, SMS, WhatsApp API, EmailJS, or Twilio.
  - Visual feedback with toasts (e.g., "Location shared successfully").
  - Styled to match theme; only visible during active rides.

### 8. Strict Error Handling

- All forms use proper validation (required fields, email format, password mismatch) with inline error messages.
- User-friendly toasts (via react-hot-toast) for success (e.g., "Ride requested!") and errors (e.g., "Invalid credentials").
- Handles network/API failures, unauthorized actions, and validation errors gracefully.

## Tech Stack

- **Frontend Framework**: React with React Router for routing.
- **State Management**: Redux Toolkit, RTK Query (for API queries/mutations), Axios (for optional HTTP requests).
- **Language**: TypeScript for type safety.
- **Styling**: Tailwind CSS (responsive utilities) + Shadcn UI (components like Button, Table, Card).
- **Data Visualization**: Recharts.
- **Notifications**: react-hot-toast.
- **Build Tool**: Vite with Bun for development and builds.
- **Other**: Lucide React for icons, React Hook Form/Zod for validation (assumed based on best practices).

## Installation Guide

### Prerequisites

- Node.js (v18+ recommended, but Bun is used for package management).
- Bun (install via `curl -fsSL https://bun.sh/install | bash` or official docs: https://bun.sh).

### Steps

1. **Clone the Repository**:

   ```
   git clone https://github.com/Rokon-Khan/ride-booking-frontend.git
   cd ride-booking-frontend
   ```

2. **Install Dependencies**:
   Use Bun for faster installation:

   ```
   bun install
   ```

3. **Environment Configuration**:

   - Create a `.env` file in the root directory (based on `.env.example` if available).
   - Set variables like `VITE_API_BASE_URL=http://localhost:5000/api` (point to your backend API).

4. **Run Development Server**:

   ```
   bun run dev
   ```

   - The app will be available at `http://localhost:5173` (default Vite port).
   - Hot Module Replacement (HMR) enabled for fast development.

5. **Build for Production**:

   ```
   bun run build
   ```

   - Outputs optimized files to `/dist` folder.
   - Preview the build: `bun run preview`.

6. **Linting and Formatting** (Optional):
   If ESLint/Prettier are configured:
   ```
   bun run lint
   bun run format
   ```

### Troubleshooting

- If Bun encounters issues, fallback to npm: `npm install`, `npm run dev`.
- Ensure backend API is running (refer to backend docs/Postman collection for endpoints).
- For TypeScript errors: Run `bun run typecheck`.

## Deployment

- Deployed on Netlify: [https://ride-sharing-pro.netlify.app/](https://ride-sharing-pro.netlify.app/)
- For custom deployment: Build the app and host on platforms like Netlify, Vercel, or AWS. Connect to GitHub for CI/CD.

## Contributing

- Fork the repository.
- Create a feature branch: `git checkout -b feature/new-feature`.
- Commit changes: `git commit -m 'Add new feature'`.
- Push to branch: `git push origin feature/new-feature`.
- Open a Pull Request.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- Built as part of a full-stack ride booking system.
- Inspired by platforms like Uber/Pathao.
- Thanks to open-source libraries: React, Redux, Tailwind, Shadcn UI, and more.

For questions or issues, open a GitHub issue or contact the maintainer. Happy riding! 🚖
