import express from 'express';
import cors from 'cors';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createStreamableTransport } from './transports/streamableHttp';
import { createSSETransport } from './transports/sse';
import { config } from './config';
import { authRouter } from './auth/auth.route';
import healthRouter from './routes/health';
import { checkClientKey } from './middlewares/checkClientKey';
import { registerAllResources } from './resources';
import { registerAllTool } from './tools';

export const server = new McpServer({
    name: config.serverName,
    version: config.serverVersion
});

registerAllResources();
registerAllTool();

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-MCP-Client',
    'X-MCP-Protocol-Version'
  ],
  methods: ['GET', 'POST', 'OPTIONS']
}));

app.use('/health', healthRouter);

app.use(checkClientKey)
app.use('/auth', authRouter)

const sseTransports: Record<string, any> = {};

// StreamableHTTP endpoint
app.post('/mcp', async (req, res) => {
    const transport = createStreamableTransport();

    res.on('close', () => transport.close());
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
});

// SSE endpoint
app.get('/sse', (req, res) => {
    const transport = createSSETransport(res);
    sseTransports[transport.sessionId] = transport;

    res.on('close', () => delete sseTransports[transport.sessionId]);
    server.connect(transport);
});

// Legacy messages
app.post('/messages', async (req, res) => {
    const sessionId = req.query.sessionId as string;
    const transport = sseTransports[sessionId];
    if (transport) await transport.handlePostMessage(req, res, req.body);
    else res.status(400).send('No transport found for sessionId');
});

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => console.log(`MCP Server running on http://localhost:${port}/mcp`));
