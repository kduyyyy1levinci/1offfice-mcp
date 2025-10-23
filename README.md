# MCP 1Office Server

A Model Context Protocol (MCP) server implementation built with TypeScript and Express.js, providing secure API endpoints for office automation and document processing.

## 🚀 Features

- **MCP Protocol Support**: Full implementation of Model Context Protocol
- **Authentication**: JWT-based token authentication with client key validation
- **Multiple Transport Types**: 
  - StreamableHTTP transport
  - Server-Sent Events (SSE) transport
- **Health Monitoring**: Built-in health check endpoints
- **TypeScript**: Full type safety and modern JavaScript features
- **Express.js**: Fast and reliable web framework

## 📋 Prerequisites

- Node.js 20+ 
- npm or yarn
- TypeScript 5.9+

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mcp-1offfice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   MCP_PRIVATE_KEY=your-secret-key
   MCP_SERVER_NAME=1office-server
   MCP_TOKEN_SECRET=your-jwt-secret
   MCP_TOKEN_EXPIRES_IN=1h
   MCP_SERVER_VERSION=1.0.0
   PORT=3000
   ```

## 🏃‍♂️ Quick Start

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Clean Build
```bash
npm run clean
npm run build
```

## 📡 API Endpoints

### Health Check
```http
GET /health
```
**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-22T13:46:33.623Z"
}
```

### Authentication
```http
POST /auth/login
Headers:
  x-client-key: your-client-key
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### MCP Endpoints

#### StreamableHTTP Transport
```http
POST /mcp
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
```

#### Server-Sent Events
```http
GET /sse
Headers:
  Authorization: Bearer <token>
```

#### Legacy Messages
```http
POST /messages?sessionId=<session-id>
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
```

## 🔧 Configuration

The server can be configured through environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `MCP_PRIVATE_KEY` | `default-key` | Client authentication key |
| `MCP_SERVER_NAME` | `default-server` | Server name for MCP |
| `MCP_TOKEN_SECRET` | `supersecret` | JWT signing secret |
| `MCP_TOKEN_EXPIRES_IN` | `1h` | JWT token expiration |
| `MCP_SERVER_VERSION` | `0.0.1` | Server version |
| `PORT` | `3000` | Server port |

## 🏗️ Project Structure

```
src/
├── auth/                 # Authentication routes
│   └── auth.route.ts
├── config/               # Configuration
│   └── index.ts
├── middlewares/          # Express middlewares
│   ├── checkClientKey.ts
│   └── checkToken.ts
├── resources/            # MCP resources
│   ├── greeting.ts
│   └── index.ts
├── routes/               # API routes
│   └── health.ts
├── tools/                # MCP tools
│   ├── add.ts
│   └── index.ts
├── transports/           # Transport implementations
│   ├── sse.ts
│   └── streamableHttp.ts
├── utils/                # Utility functions
│   └── fetchJSON.ts
└── server.ts             # Main server file
```

## 🔒 Security

- **Client Key Authentication**: All endpoints require valid client key
- **JWT Token Validation**: Protected endpoints require valid JWT tokens
- **Environment Variables**: Sensitive data stored in environment variables
- **Type Safety**: Full TypeScript type checking

## 🧪 Testing

```bash
# Health check
curl http://localhost:3000/health

# Authentication
curl -X POST http://localhost:3000/auth/login \
  -H "x-client-key: your-client-key"

# MCP endpoint (with token)
curl -X POST http://localhost:3000/mcp \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"method": "ping"}'
```

## 📦 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run clean` | Remove build directory |
| `npm run lint` | Run ESLint |

## 🛠️ Development

### Adding New Tools
1. Create tool in `src/tools/`
2. Export from `src/tools/index.ts`
3. Register with MCP server

### Adding New Resources
1. Create resource in `src/resources/`
2. Export from `src/resources/index.ts`
3. Register with MCP server

### Adding New Routes
1. Create route file in appropriate directory
2. Import and use in `src/server.ts`

## 📝 License

ISC License

For issues and questions, please create an issue in the repository.

---

**Built with ❤️ using TypeScript, Express.js, and MCP SDK**