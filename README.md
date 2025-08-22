# HomeySpace - Integrated Home Design & Management SaaS Platform

A comprehensive monorepo containing five integrated applications for home design, marketplace, mobile management, business operations, and shared components.

## 🏗️ Architecture

### Applications

- **Studio** (`apps/studio`) - 3D home design tool with Three.js
- **Market** (`apps/market`) - E-commerce marketplace with payment integration
- **Home** (`apps/home`) - React Native mobile app for maintenance and payments
- **Flow** (`apps/flow`) - ERP/CRM dashboard for business management
- **Gateway** (`packages/gateway`) - GraphQL API gateway and microservices

### Libraries

- **UI** (`libs/ui`) - Shared component library with Tailwind CSS
- **Core** (`libs/core`) - Shared utilities, types, and business logic

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Docker (optional)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd homeyspace-monorepo

# Install dependencies
pnpm install

# Start all applications in development mode
pnpm run dev
```

### Individual App Development

```bash
# Studio (3D Design) - http://localhost:3001
pnpm run studio:dev

# Market (E-commerce) - http://localhost:3002
pnpm run market:dev

# Home (Mobile) - Expo development
cd apps/home && pnpm run dev

# Flow (ERP/CRM) - http://localhost:3003
pnpm run flow:dev

# API Gateway - http://localhost:4000
pnpm run gateway:dev
```

## 🏢 Applications Overview

### Studio - 3D Home Design
- **Tech Stack**: React, Three.js, React Three Fiber, Vite
- **Features**: 
  - Drag-and-drop furniture placement
  - Real-time 3D rendering with lighting and shadows
  - Live cost calculation integrated with Market
  - Export designs and material lists

### Market - E-commerce Marketplace
- **Tech Stack**: Next.js, Stripe, Razorpay, Zustand
- **Features**:
  - Product catalog with search and filtering
  - Shopping cart and checkout flow
  - Payment integration (Stripe, Razorpay, UPI)
  - Order management and tracking

### Home - Mobile Management App
- **Tech Stack**: React Native, Expo, React Navigation
- **Features**:
  - Digital wallet with UPI integration
  - Bill payments and expense tracking
  - Maintenance service booking
  - Calendar integration and notifications

### Flow - Business ERP/CRM
- **Tech Stack**: Next.js, Recharts, React Table
- **Features**:
  - Customer relationship management
  - Project tracking and management
  - Invoice generation with GST compliance
  - Business analytics and reporting

### Gateway - API Gateway
- **Tech Stack**: Node.js, Express, Apollo GraphQL, JWT
- **Features**:
  - GraphQL federation for microservices
  - Authentication and authorization
  - Payment processing endpoints
  - Webhook handling for external services

## 🛠️ Development

### Project Structure

```
homeyspace-monorepo/
├── apps/
│   ├── studio/          # 3D Design Tool
│   ├── market/          # E-commerce Platform
│   ├── home/            # Mobile App
│   └── flow/            # ERP/CRM Dashboard
├── packages/
│   └── gateway/         # API Gateway
├── libs/
│   ├── ui/              # Shared UI Components
│   └── core/            # Shared Business Logic
├── .github/
│   └── workflows/       # CI/CD Pipelines
└── docker-compose.yml   # Development Environment
```

### Available Scripts

```bash
# Development
pnpm run dev              # Start all apps
pnpm run studio:dev       # Start Studio app
pnpm run market:dev       # Start Market app
pnpm run home:dev         # Start Home app (Expo)
pnpm run flow:dev         # Start Flow app
pnpm run gateway:dev      # Start API Gateway

# Building
pnpm run build            # Build all apps
pnpm run test             # Run all tests
pnpm run lint             # Lint all code

# Deployment
pnpm run deploy           # Deploy to staging
pnpm run deploy:prod      # Deploy to production
```

### Environment Variables

Create `.env` files in each application directory:

```bash
# Gateway (.env)
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=sk_test_...
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...

# Market (.env.local)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_API_URL=http://localhost:4000

# Studio (.env)
VITE_API_URL=http://localhost:4000

# Flow (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm run test

# Run tests for specific app
pnpm run test --filter @homeyspace/studio

# Run E2E tests
pnpm run test:e2e

# Generate coverage report
pnpm run test:coverage
```

### Test Structure

- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Cypress for user workflows
- **Coverage Target**: 80%+ across all applications

## 🚢 Deployment

### Docker Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to staging
pnpm run deploy

# Deploy to production
pnpm run deploy:prod
```

### CI/CD Pipeline

The project includes GitHub Actions workflows for:

- **Continuous Integration**: Automated testing and building
- **Staging Deployment**: Auto-deploy on `develop` branch
- **Production Deployment**: Auto-deploy on `main` branch
- **Security Scanning**: Dependency and code security checks

## 📊 Features by Subscription Tier

| Feature | Free | Starter | Pro | Business | Enterprise |
|---------|------|---------|-----|----------|------------|
| 3D Studio Projects | 1 | 5 | 25 | 100 | Unlimited |
| Market Orders | 10/month | 50/month | 200/month | 1000/month | Unlimited |
| Home Wallet | ✓ | ✓ | ✓ | ✓ | ✓ |
| Flow CRM | - | 100 contacts | 1000 contacts | 10K contacts | Unlimited |
| AI Co-Pilot | - | - | ✓ | ✓ | ✓ |
| AR/VR Features | - | - | - | ✓ | ✓ |
| API Access | - | - | ✓ | ✓ | ✓ |
| Priority Support | - | - | - | ✓ | ✓ |

## 🔧 Troubleshooting

### Common Issues

**Port Conflicts**
```bash
# Check which process is using a port
lsof -i :3001

# Kill process
kill -9 <PID>
```

**CORS Issues**
- Ensure API Gateway is running on port 4000
- Check environment variables in each app
- Verify CORS configuration in gateway

**Missing Environment Variables**
```bash
# Copy example env files
cp apps/studio/.env.example apps/studio/.env
cp apps/market/.env.example apps/market/.env.local
```

**Database Connection Issues**
```bash
# Start PostgreSQL with Docker
docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15

# Check connection
psql -h localhost -U postgres -d homeyspace
```

**Build Failures**
```bash
# Clear all node_modules and reinstall
pnpm clean
rm -rf node_modules
pnpm install

# Clear build caches
pnpm run clean
```

### Getting Help

- **Documentation**: Check individual app README files
- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub Discussions for questions
- **Support**: Contact support@homeyspace.com

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Three.js community for 3D rendering capabilities
- Stripe and Razorpay for payment processing
- React Native and Expo teams for mobile development
- All open-source contributors who made this possible

---

**HomeySpace** - Transforming how people design, buy, and manage their homes.