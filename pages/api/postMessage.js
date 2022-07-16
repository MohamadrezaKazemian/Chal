const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const messageData = JSON.parse(req.body);
    const savedMessage = await prisma.message.create({ data: messageData });
    res.status(200).json(savedMessage)

  } catch (error) {
    res.status(500).json({ message: error });
  }
};