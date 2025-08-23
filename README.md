# Overview

UrlShortener is a modern URL shortening web application built with a full-stack architecture. It provides users with the ability to create short, memorable links from long URLs with optional customization and basic analytics tracking. The application features a clean, responsive single-page interface with real-time feedback and QR code generation for shortened URLs.

# User Preferences

Preferred communication style: Simple, everyday l
# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript for type safety and component-based development
- **Routing**: Wouter for lightweight client-side routing with support for URL redirects
- **Styling**: Tailwind CSS with a comprehensive design system using shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for robust form validation and submission
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript for full-stack type safety
- **Architecture Pattern**: RESTful API with clear separation between routes, storage, and business logic
- **Storage Abstraction**: Interface-based storage layer with in-memory implementation (easily extensible to databases)
- **URL Generation**: Base62 encoding for compact, readable short codes
- **Development**: Hot module replacement with Vite middleware integration

## Data Storage Solutions
- **Current**: In-memory storage using Maps for development and testing
- **Database Ready**: Drizzle ORM configured for PostgreSQL with schema definitions
- **Schema**: Well-defined database tables for URLs and click tracking with proper relationships
- **Migration Support**: Drizzle Kit configured for database schema management

## Authentication and Authorization
- **Current State**: No authentication implemented - open access for basic URL shortening
- **Session Ready**: Connect-pg-simple configured for PostgreSQL session storage when auth is added
- **Security**: CORS and basic security headers configured

## API Structure
- **Endpoints**:
  - `POST /api/urls` - Create shortened URLs with optional custom aliases
  - `GET /api/urls/check-alias/:alias` - Check availability of custom aliases
  - `GET /api/redirect/:shortCode` - Handle URL redirects with click tracking
  - `GET /api/analytics` - Retrieve analytics data
- **Validation**: Zod schemas for request validation and type safety
- **Error Handling**: Centralized error handling with proper HTTP status codes

## Key Features
- **URL Shortening**: Base62 encoding for compact URLs with collision detection
- **Custom Aliases**: User-defined short codes with real-time availability checking
- **QR Code Generation**: Automatic QR code creation with download functionality
- **Click Analytics**: Basic click tracking and analytics dashboard
- **Responsive Design**: Mobile-first design with comprehensive UI components
- **Real-time Validation**: Instant feedback for URL validation and alias availability

# External Dependencies

## Database
- **Neon Database**: PostgreSQL database service (@neondatabase/serverless)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations and schema management
- **Session Store**: PostgreSQL session storage via connect-pg-simple

## UI and Styling
- **Component Library**: Radix UI primitives for accessible, unstyled components
- **Styling**: Tailwind CSS with PostCSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **QR Codes**: qrcode library for QR code generation
- **Animations**: Class Variance Authority (CVA) for component variants

## Development Tools
- **Build**: Vite with React plugin and TypeScript support
- **Error Handling**: Replit-specific error overlay and cartographer plugins
- **Development**: TSX for TypeScript execution in development
- **Production**: esbuild for server bundling

## Utilities
- **Date Handling**: date-fns for date manipulation and formatting
- **Carousel**: Embla Carousel React for image/content carousels
- **Form Validation**: Hookform resolvers with Zod integration
- **Styling Utilities**: clsx and tailwind-merge for conditional styling
- **Command Palette**: cmdk for command palette functionality
