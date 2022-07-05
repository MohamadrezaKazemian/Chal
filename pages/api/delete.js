import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const messageContent = JSON.parse(req.body);

    const deletedAuthor = await prisma.user.deleteMany({
        where: {
            message: messageContent
        }
    });
    res.status(200).json(deletedAuthor)
};
