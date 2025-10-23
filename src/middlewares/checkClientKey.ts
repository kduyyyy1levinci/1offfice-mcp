import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export function checkClientKey(req: Request, res: Response, next: NextFunction) {
    const clientKey = req.headers['x-client-key'] as string;
    if (!clientKey) return res.status(401).json({ error: 'Client key required' });
    if (clientKey.replace(/"/g, '').trim() !== config.privateKey.replace(/"/g, '').trim()) {
        return res.status(401).json({ error: 'Invalid client key' });
    }

    next();
}
