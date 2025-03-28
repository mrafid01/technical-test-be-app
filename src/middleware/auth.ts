import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (payload) {
            // Misalnya, gunakan "sub" sebagai ID unik user (konversi ke number atau simpan sebagai string)
            (req as any).userId = payload['sub'];
            next();
        } else {
            res.status(401).json({ error: 'Invalid token payload' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
