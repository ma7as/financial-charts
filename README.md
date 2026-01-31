# Financial Charts Monorepo

Full-stack financial charting application with real-time market data.

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **ECharts** - Advanced charting library
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS
- **Socket.IO** - Real-time WebSocket communication

### Backend
- **NestJS** - Progressive Node.js framework
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Relational database
- **Redis** - Caching layer
- **Socket.IO** - WebSocket server

## 📋 Prerequisites

- Node.js 20+
- pnpm 8+
- Docker & Docker Compose

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
cd financial-charts-monorepo

# Install pnpm globally if you haven't
npm install -g pnpm

# Install dependencies
pnpm install
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your settings (optional, defaults work for local dev)
```

### 3. Start Services with Docker Compose

```bash
# Start PostgreSQL and Redis
pnpm docker:up

# Wait for services to be healthy (~10 seconds)
```

### 4. Setup Database

```bash
# Generate Prisma client
pnpm db:push

# Seed initial data
pnpm db:seed
```

### 5. Start Development Servers

```bash
# Start both frontend and backend
pnpm dev

# Or start individually:
pnpm dev:frontend  # http://localhost:3000
pnpm dev:backend   # http://localhost:3001
```

## 📚 Available Scripts

```bash
# Development
pnpm dev              # Start all services
pnpm dev:frontend     # Start Next.js frontend only
pnpm dev:backend      # Start NestJS backend only

# Docker
pnpm docker:up        # Start Docker containers
pnpm docker:down      # Stop Docker containers
pnpm docker:logs      # View container logs

# Database
pnpm db:push          # Push schema to database
pnpm db:migrate       # Create migrations
pnpm db:studio        # Open Prisma Studio
pnpm db:seed          # Seed database

# Build
pnpm build            # Build all apps
pnpm build:frontend   # Build frontend only
pnpm build:backend    # Build backend only

# Quality
pnpm lint             # Lint all apps
pnpm test             # Test all apps
```

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Docs (Swagger)**: http://localhost:3001/api/docs
- **Prisma Studio**: `pnpm db:studio`

## 📦 Project Structure

```
financial-charts-monorepo/
├── apps/
│   ├── frontend/          # Next.js application
│   │   ├── src/
│   │   │   ├── app/       # App router pages
│   │   │   ├── components/
│   │   │   └── lib/
│   │   └── Dockerfile
│   └── backend/           # NestJS application
│       ├── src/
│       │   ├── market/    # Market data module
│       │   ├── symbols/   # Symbols module
│       │   └── prisma/    # Prisma service
│       └── Dockerfile
├── packages/
│   └── database/          # Prisma schema & migrations
│       └── prisma/
├── docker-compose.yml
├── pnpm-workspace.yaml
└── package.json
```

## 🔌 API Endpoints

### Market Data
- `GET /api/v1/market/ohlc?symbol=BTCUSDT&interval=1h&limit=100`
- `GET /api/v1/market/indicators?symbol=BTCUSDT&interval=1h&ma=20,50`

### Symbols
- `GET /api/v1/symbols` - Get all symbols
- `GET /api/v1/symbols/:symbol` - Get specific symbol

### WebSocket
- `ws://localhost:3001/market` - Real-time candle updates

## 🎯 Features

- ✅ Real-time candlestick charts
- ✅ Multiple timeframes (1m, 5m, 15m, 1h, 4h, 1d, etc.)
- ✅ Volume visualization
- ✅ Zoom and pan functionality
- ✅ WebSocket real-time updates
- ✅ Technical indicators (MA, more coming)
- ✅ Responsive design
- ✅ Type-safe API with TypeScript
- ✅ Docker containerization

## 🐛 Troubleshooting

### Database connection failed
```bash
# Reset database
pnpm docker:down
pnpm docker:up
pnpm db:push
```

### Port already in use
```bash
# Change ports in .env:
PORT=3002                          # Backend
# In docker-compose.yml:
ports:
  - "5433:5432"                   # PostgreSQL
```

### WebSocket not connecting
- Check CORS settings in backend
- Ensure NEXT_PUBLIC_WS_URL is correct in frontend

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.
