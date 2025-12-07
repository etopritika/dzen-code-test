# Frontend Documentation

React + TypeScript + Vite Single Page Application for Orders Management System.

## 🚀 Development Startup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite default port).

### Development Features

- Hot Module Replacement (HMR)
- Fast refresh for React components
- TypeScript type checking
- ESLint for code quality

## 🏗️ Build Instructions

### Production Build

```bash
npm run build
```

This command:

1. Runs TypeScript compilation (`tsc -b`)
2. Builds optimized production bundle with Vite
3. Outputs to `dist/` directory

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

### Build Output

- **Location**: `dist/` directory
- **Contents**:
  - `index.html` - Entry HTML file
  - `assets/` - Optimized JS, CSS, and static assets
  - All assets are hashed for cache busting

## 🐳 Dockerfile Explanation

The frontend uses a **multi-stage build** process:

### Stage 1: Build (node:18-alpine)

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build
```

**Purpose**:

- Installs dependencies with `npm ci` (faster, reproducible)
- Builds the React application using Vite
- Produces optimized production bundle in `dist/`

### Stage 2: Run (nginx:stable-alpine)

```dockerfile
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Purpose**:

- Uses lightweight Nginx Alpine image
- Copies built assets from Stage 1
- Configures Nginx to serve the SPA
- Handles client-side routing with fallback to `index.html`

**Benefits**:

- Final image is small (~20MB vs ~200MB with Node.js)
- Fast startup time
- Production-ready web server

## 📁 Features

### Pages

#### Orders Page (`/orders`)

- Displays list of orders in cards
- Select order to view details in sidebar
- Delete order functionality (with confirmation modal)
- Add product form (React Hook Form + Zod)
- Real-time order data from Redux store
- Computed fields: product count, USD/UAH sums, formatted dates

#### Products Page (`/products`)

- Displays all products in a grid/list
- Filter by product type (persisted in localStorage)
- Type filter dropdown with all available types
- Product details: title, type, serial number, prices

#### Reports Page (`/reports`)

- **USD Chart**: BarChart showing USD sum per order
- **UAH Chart**: LineChart showing aggregated UAH sums by date
- Data processed by utility functions (`buildUSDChartData`, `buildUAHChartData`)
- Charts use Recharts library

#### Map Page (`/map`)

- Embedded Google Maps iframe
- Centered on Kharkiv, Ukraine
- Full-width responsive map display

#### Login Page (`/login`)

- Email-based login form
- React Hook Form + Zod validation
- Generates mock JWT token
- Fully internationalized (EN/UA)
- Redirects to `/orders` after successful login

### Internationalization (i18n)

**Implementation**: react-i18next

**Languages**: English (en), Ukrainian (ua)

**Features**:

- Language toggle button in TopMenu
- Language preference persisted in localStorage
- All UI text translated (titles, buttons, labels, validation messages)
- Translation files: `src/i18n/en.json`, `src/i18n/ua.json`

**Usage**:

```tsx
import { useTranslation } from "react-i18next";

const { t } = useTranslation();
<h2>{t("orders.title")}</h2>;
```

### Formatting Helpers

**Location**: `src/utils/formatDate.ts`

**Functions**:

- `formatShortDate(dateString: string)`: Returns "dd / mm" format
- `formatFullDate(date: Date | string)`: Returns "dd MMM yyyy" format

**Usage**:

```tsx
import { formatShortDate, formatFullDate } from "@/utils/formatDate";
const short = formatShortDate(order.date); // "29 / 06"
const full = formatFullDate(order.date); // "29 Jun 2017"
```

### Animate.css Transitions

**Library**: Animate.css

**Usage**:

- Route transitions: Fade-in on route change (in `Layout.tsx`)
- Modal animations: Fade-in-down for modals
- Component animations: Fade-in-right for OrderDetails sidebar

**Example**:

```tsx
<div className="animate__animated animate__fadeIn">
  <Outlet />
</div>
```

### Lazy Loading

**Implementation**: React.lazy + Suspense

**Routes Lazy-Loaded**:

- OrdersPage
- ProductsPage
- ReportsPage
- MapPage

**Benefits**:

- Reduced initial bundle size
- Faster initial page load
- Code splitting per route

**Configuration**: `src/router/index.tsx`

### WebSocket Usage

**Library**: socket.io-client

**Hook**: `useActiveSessions()`

**Purpose**: Track active WebSocket connections in real-time

**Implementation**:

- Connects to `http://localhost:4000` (development)
- Listens for `activeSessions` event
- Updates count in TopMenu component
- Auto-disconnects on unmount

**Usage**:

```tsx
import { useActiveSessions } from "@/hooks/useActiveSessions";

const activeSessions = useActiveSessions();
<span>Sessions: {activeSessions}</span>;
```

### Form Validation (RHF + Zod)

**Libraries**: React Hook Form, Zod, @hookform/resolvers

**Form**: Add Product form in OrderDetails

**Validation Schema**:

```tsx
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.string().min(1, "Type is required"),
  priceUSD: z.number().min(1, "Price must be positive"),
});
```

**Features**:

- Real-time validation
- Error messages displayed below fields
- i18n support for error messages
- Type-safe form data

### Web Storage (useLocalStorage Hook)

**Custom Hook**: `useLocalStorage<T>(key: string, initialValue: T)`

**Features**:

- Generic type support
- Automatic JSON serialization/deserialization
- Error handling with try/catch
- Syncs with localStorage on every change

**Usage**:

```tsx
const [lang, setLang] = useLocalStorage<"en" | "ua">("lang", "en");
```

**Persisted State**:

1. **selectedOrderId**: Selected order ID (via `usePersistedSelectedOrder`)
2. **selectedType**: Product filter type (via `useProductsFilter`)
3. **lang**: Language preference (via i18next)

### Charts Data Utilities

**Location**: `src/utils/charts.ts`

**Functions**:

#### `buildUSDChartData(orders: Order[])`

- Maps each order to chart data point
- Returns: `{ name: string, usd: number }[]`
- Filters products by `order.id` before calculating sum

#### `buildUAHChartData(orders: Order[])`

- Aggregates UAH sums by date
- Groups orders by date (short format)
- Returns: `{ date: string, uah: number }[]`
- Filters products by `order.id` before calculating sum

**Testing**: Unit tests in `src/utils/__tests__/charts.test.ts`

## 📂 Folder Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── axiosClient.ts          # Axios instance configuration
│   │
│   ├── components/
│   │   ├── ModalWrapper.tsx        # Reusable modal component
│   │   └── Navigation.tsx         # Side navigation menu
│   │
│   ├── hooks/
│   │   ├── useActiveSessions.ts   # WebSocket active sessions hook
│   │   ├── useLiveClock.ts        # Real-time clock hook
│   │   ├── useLocalStorage.ts     # localStorage persistence hook
│   │   ├── usePersistedSelectedOrder.ts  # Order selection persistence
│   │   └── useProductsFilter.ts    # Product type filtering
│   │
│   ├── i18n/
│   │   ├── en.json                # English translations
│   │   ├── ua.json                # Ukrainian translations
│   │   └── index.ts               # i18next configuration
│   │
│   ├── layout/
│   │   ├── Layout.tsx             # Main layout wrapper
│   │   └── TopMenu.tsx            # Header with clock, sessions, lang toggle
│   │
│   ├── pages/
│   │   ├── Auth/
│   │   │   └── LoginPage.tsx     # JWT login page
│   │   │
│   │   ├── Map/
│   │   │   └── MapPage.tsx        # Google Maps iframe page
│   │   │
│   │   ├── Orders/
│   │   │   ├── __tests__/
│   │   │   │   └── OrderItem.test.tsx
│   │   │   ├── AddProductForm.tsx # RHF + Zod form
│   │   │   ├── DeletePopup.tsx    # Delete confirmation modal
│   │   │   ├── OrderDetails.tsx   # Order details sidebar
│   │   │   ├── OrderItem.tsx      # Order card component
│   │   │   ├── OrderList.tsx      # Orders list container
│   │   │   ├── OrdersPage.tsx     # Main orders page
│   │   │   └── ProductRow.tsx     # Product row in order details
│   │   │
│   │   ├── Products/
│   │   │   ├── ProductItem.tsx    # Product card component
│   │   │   ├── ProductList.tsx    # Products list container
│   │   │   └── ProductsPage.tsx   # Main products page
│   │   │
│   │   └── Reports/
│   │       ├── ReportsPage.tsx     # Reports page container
│   │       ├── UAHChart.tsx        # UAH LineChart component
│   │       └── USDChart.tsx       # USD BarChart component
│   │
│   ├── router/
│   │   ├── index.tsx              # React Router configuration
│   │   └── ProtectedRoute.tsx     # Route protection component
│   │
│   ├── store/
│   │   ├── index.ts               # Redux store configuration
│   │   ├── ordersSlice.ts         # Orders Redux slice
│   │   └── productsSlice.ts       # Products Redux slice
│   │
│   ├── tests/
│   │   └── setup.ts               # Vitest test setup
│   │
│   ├── utils/
│   │   ├── __tests__/
│   │   │   └── charts.test.ts     # Charts utilities tests
│   │   ├── charts.ts              # Chart data processing functions
│   │   ├── formatDate.ts          # Date formatting utilities
│   │   └── orderHelpers.ts        # Order calculation helpers
│   │
│   ├── App.tsx                    # Root component
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles
│
├── public/                        # Static assets
├── Dockerfile                     # Multi-stage Docker build
├── nginx.conf                     # Nginx configuration
├── package.json
├── tsconfig.json                  # TypeScript configuration
└── vite.config.ts                 # Vite + Vitest configuration
```

## 🔌 API baseURL Expectations

### Development Mode

The frontend expects the backend API at:

```
http://localhost:4000
```

**Configuration**: `src/api/axiosClient.ts`

```tsx
baseURL: "http://localhost:4000";
```

### Docker Mode

When running in Docker, the frontend connects to backend via service name:

```
http://backend:4000
```

**Configuration**: `src/api/axiosClient.ts` (updated for Docker)

```tsx
baseURL: "http://backend:4000";
```

**Note**: The baseURL should be changed based on the environment. Consider using environment variables for production deployments.

## 🔐 JWT Authentication

### Overview

Mock JWT authentication implemented on the frontend. All routes except `/login` are protected and require a valid token.

### Components

#### `ProtectedRoute.tsx`

- Checks for token in `localStorage`
- Redirects to `/login` if token is missing
- Wraps all protected routes in router configuration

**Usage**:

```tsx
<ProtectedRoute>
  <Layout />
</ProtectedRoute>
```

#### `LoginPage.tsx`

- Email input with validation (Zod schema)
- Generates mock token: `jwt_{timestamp}`
- Stores token in `localStorage`
- Redirects to `/orders` after login
- Fully internationalized

**Validation**:

- Email: Required, valid email format
- Error messages translated (EN/UA)

### Axios Interceptor

**File**: `src/api/axiosClient.ts`

Automatically adds JWT token to all HTTP requests:

```typescript
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

**How it works**:

1. Every HTTP request goes through the interceptor
2. Interceptor reads token from `localStorage`
3. If token exists, adds `Authorization: Bearer {token}` header
4. Request proceeds with authentication header

**Benefits**:

- No manual token management in components
- Works for all HTTP methods automatically
- Centralized authentication logic

### Logout

- Logout button in `TopMenu` component
- Removes token from `localStorage`
- Redirects to `/login` using `window.location.href`
- Fully internationalized

### Token Storage

- **Key**: `"token"`
- **Format**: `jwt_{timestamp}` (e.g., `jwt_1701234567890`)
- **Location**: `localStorage`
- **Lifetime**: Until user logs out or clears browser storage

### Route Protection Flow

```
User accesses /orders
    ↓
ProtectedRoute checks localStorage.getItem("token")
    ↓
Token exists? → YES → Render protected content
    ↓
Token exists? → NO → <Navigate to="/login" />
```

### Security Notes

- **Mock Implementation**: This is a frontend-only mock authentication
- **No Backend Validation**: Backend does not validate tokens
- **Production**: Implement proper JWT validation on backend
- **Token Storage**: Consider `httpOnly` cookies for production

## 🧪 Testing

### Test Framework

- **Vitest**: Fast unit test runner
- **React Testing Library**: Component testing utilities
- **JSDOM**: DOM environment for tests

### Run Tests

```bash
npm test              # Run once
npm run test:watch    # Watch mode
```

### Test Files

- `src/utils/__tests__/charts.test.ts` - Chart data utilities
- `src/pages/Orders/__tests__/OrderItem.test.tsx` - OrderItem component

### Test Configuration

Located in `vite.config.ts`:

```ts
test: {
  environment: "jsdom",
  globals: true,
  setupFiles: "./src/tests/setup.ts",
  css: false,
}
```

## 📦 Scripts

| Script               | Description              |
| -------------------- | ------------------------ |
| `npm run dev`        | Start development server |
| `npm run build`      | Build production bundle  |
| `npm run preview`    | Preview production build |
| `npm run lint`       | Run ESLint               |
| `npm test`           | Run tests once           |
| `npm run test:watch` | Run tests in watch mode  |

## 🔧 Configuration Files

- **vite.config.ts**: Vite build config + Vitest test config
- **tsconfig.json**: TypeScript compiler options
- **tsconfig.app.json**: App-specific TypeScript config
- **tsconfig.node.json**: Node-specific TypeScript config
- **eslint.config.js**: ESLint rules
- **nginx.conf**: Nginx server configuration for production

## 🎨 Styling

- **Bootstrap 5**: Utility-first CSS framework
- **Bootstrap Icons**: Icon library
- **Animate.css**: CSS animations
- **Custom CSS**: `src/index.css` for global styles

## ⚡ Performance Optimizations

The application implements advanced performance optimizations with focus on scalability for large datasets (10,000+ items):

### Component Memoization

- **OrderItem**: Wrapped in `React.memo` to prevent unnecessary re-renders when props are stable
- **ProductItem**: Wrapped in `React.memo` to prevent re-renders with stable props
- **ProductRow**: Wrapped in `React.memo` to prevent re-renders with stable props
- **UAHChart & USDChart**: Wrapped in `React.memo` to prevent re-renders when orders data hasn't changed

### Computed Values Memoization

**useMemo** is applied only to expensive O(n) operations that scale with data size:

- **OrderItem**: Sums (USD/UAH) - `reduce` operations over products array
- **ProductItem**: Order lookup - `find` operation over orders array
- **useProductsFilter**: Types extraction - `map` over products array
- **useProductsFilter**: Filtered products - `filter` over products array
- **USDChart**: Chart data processing - aggregation over orders
- **UAHChart**: Chart data processing - aggregation over orders

**Note**: Trivial operations (O(1)) like date formatting, simple property access (`length`), and small array lookups (2-3 elements) are intentionally not memoized to avoid overhead.

### Callback Memoization

**useCallback** is applied only when callbacks are passed to memoized child components:

- **OrdersPage**: `handleSelect`, `handleDelete`, `handleCloseDetails`, `handleCancelDelete`, `handleConfirmDelete` are memoized with `useCallback`

**Note**: Callbacks used only in HTML event handlers (like `handleTypeChange` in ProductsPage, `handleClick` in OrderItem, or buttons in TopMenu) don't need memoization since they're not passed to React components.

### Benefits

- **Reduced Re-renders**: Components only re-render when their props actually change
- **Optimized Calculations**: Expensive O(n) computations are cached
- **Scalable Performance**: Optimizations designed for 10,000+ items
- **Stable References**: Memoized callbacks prevent child component re-renders
- **Better Performance**: Especially noticeable with large lists (1,000+ items)

### Best Practices Applied

- Memoization applied selectively where it provides real benefit
- No over-optimization - trivial computations (O(1)) left as-is
- Focus on scalability - all O(n) operations are memoized
- All optimizations maintain existing functionality and behavior

## 📝 Notes

- All routes are lazy-loaded for optimal performance
- State persistence uses localStorage via custom hooks
- WebSocket connection is established only when needed
- Form validation messages are internationalized
- Charts data is memoized for performance
- TypeScript strict mode enabled for type safety
