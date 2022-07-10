import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
	if (req.method !== 'DELETE') {
		return res.status(405).json({ message: 'Method not allowed' });
	}
	try {
		const messageId = JSON.parse(req.body);
		const deletedMessage = await prisma.message.deleteMany({
			where: {
				id: messageId
			}
		});
		res.status(200).json(deletedMessage)
	} catch (error) {
		res.status(404).json({ message: error });
	}
};