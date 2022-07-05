import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const messageData = JSON.parse(req.body);
    const savedMessage = await prisma.user.create({ data: messageData });
    res.status(200).json(savedMessage)
    res.json("wqe")

  } catch (err) {
    res.status(400).json({ message: err });
  }
};
