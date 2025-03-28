import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { OAuth2Client } from 'google-auth-library';

const router = Router();
const prisma = new PrismaClient();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        res.status(400).json({ error: 'Token tidak disediakan' });
        return;
    }

    try {
        // Verifikasi token Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        if (!payload || !payload.email) {
            res.status(400).json({ error: 'Payload token tidak valid' });
            return;
        }

        const email = payload.email;
        const name = payload.name || '';
        const image = payload.picture || '';
        const id = payload['sub'];

        // Cek apakah user sudah ada
        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Buat user baru
            user = await prisma.user.create({
                data: {
                    id,
                    email,
                    name,
                    image,
                },
            });
        }
        res.json(user);
    } catch (error) {
        console.error('Error create user:', error);
        res.status(401).json({ error: 'Token tidak valid atau terjadi error' });
    }
});

export default router;
