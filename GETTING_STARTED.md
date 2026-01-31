# Financial Charts Monorepo

## 🎉 Proyecto Completamente Generado!

### ✅ Estructura Creada

```
financial-charts-monorepo/
├── apps/
│   ├── backend/              ✅ NestJS Backend
│   └── frontend/             ✅ Next.js Frontend
├── packages/
│   └── database/             ✅ Prisma + PostgreSQL
├── docker-compose.yml        ✅ Docker orchestration
└── pnpm-workspace.yaml       ✅ Monorepo config
```

### 📦 Tecnologías Incluidas

**Frontend:**
- ✅ Next.js 15 con App Router
- ✅ React 18
- ✅ ECharts para gráficos financieros
- ✅ TanStack Query (React Query v5)
- ✅ Socket.IO client para WebSockets
- ✅ Tailwind CSS
- ✅ TypeScript

**Backend:**
- ✅ NestJS 10
- ✅ Prisma ORM
- ✅ PostgreSQL 16
- ✅ Redis 7 (cache)
- ✅ Socket.IO para WebSockets
- ✅ Swagger/OpenAPI docs
- ✅ TypeScript

### 🚀 Cómo Iniciar el Proyecto

#### 1. Navegar al proyecto
```powershell
cd b:\github\chartjs-chart-financial-sad\financial-charts-monorepo
```

#### 2. Instalar pnpm (si no lo tienes)
```powershell
npm install -g pnpm
```

#### 3. Instalar dependencias
```powershell
pnpm install
```

#### 4. Copiar archivo de entorno
```powershell
Copy-Item .env.example .env
```

#### 5. Iniciar servicios con Docker
```powershell
# Inicia PostgreSQL y Redis
pnpm docker:up

# Espera ~10 segundos a que los servicios estén listos
```

#### 6. Configurar base de datos
```powershell
# Genera el cliente de Prisma y crea las tablas
pnpm db:push

# Inserta datos de prueba (símbolos de criptomonedas)
pnpm db:seed
```

#### 7. Iniciar aplicaciones
```powershell
# Opción A: Iniciar todo junto
pnpm dev

# Opción B: Iniciar por separado (en diferentes terminales)
pnpm dev:frontend   # Terminal 1 - http://localhost:3000
pnpm dev:backend    # Terminal 2 - http://localhost:3001
```

### 🌐 URLs Disponibles

Una vez iniciado todo:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Docs (Swagger)**: http://localhost:3001/api/docs
- **Prisma Studio**: Ejecuta `pnpm db:studio`

### 🎯 Características Implementadas

1. ✅ **Gráficos Candlestick en tiempo real** con ECharts
2. ✅ **WebSocket** para actualizaciones live desde Binance
3. ✅ **Múltiples intervalos** (1m, 5m, 15m, 1h, 4h, 1d, etc.)
4. ✅ **Gráfico de volumen** integrado
5. ✅ **Zoom y pan** interactivo
6. ✅ **Selección de símbolos** (BTC, ETH, BNB, SOL)
7. ✅ **API RESTful** con validación
8. ✅ **Base de datos** con Prisma
9. ✅ **Cache con Redis**
10. ✅ **Docker Compose** para desarrollo

### 📊 Endpoints API

**Market Data:**
```
GET /api/v1/market/ohlc?symbol=BTCUSDT&interval=1h&limit=100
GET /api/v1/market/indicators?symbol=BTCUSDT&interval=1h&ma=20,50
```

**Symbols:**
```
GET /api/v1/symbols
GET /api/v1/symbols/BTCUSDT
```

**WebSocket:**
```
ws://localhost:3001/market
Events: subscribe, unsubscribe
Receives: candle (real-time updates)
```

### 🛠️ Comandos Útiles

```powershell
# Ver logs de Docker
pnpm docker:logs

# Parar Docker
pnpm docker:down

# Abrir Prisma Studio (UI para la base de datos)
pnpm db:studio

# Lint código
pnpm lint

# Build para producción
pnpm build
```

### 🐛 Solución de Problemas

#### Puerto ocupado:
```powershell
# Cambiar puertos en .env o docker-compose.yml
```

#### Base de datos no conecta:
```powershell
pnpm docker:down
pnpm docker:up
pnpm db:push
```

#### Dependencias desactualizadas:
```powershell
pnpm install --force
```

### 📈 Próximos Pasos (Opcional)

1. **Indicadores técnicos**: RSI, MACD, Bollinger Bands
2. **Autenticación**: JWT + Guards en NestJS
3. **Watchlists personalizadas**: Guardar favoritos
4. **Alertas de precio**: Notificaciones push
5. **Backtesting**: Simulación de estrategias
6. **Más exchanges**: Coinbase, Kraken, etc.

### 📚 Documentación de Referencia

- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [ECharts Docs](https://echarts.apache.org/en/index.html)
- [Prisma Docs](https://www.prisma.io/docs)
- [Docker Compose Docs](https://docs.docker.com/compose/)

---

**¡El proyecto está listo para usar! 🎉**

Ejecuta `pnpm dev` y abre http://localhost:3000
