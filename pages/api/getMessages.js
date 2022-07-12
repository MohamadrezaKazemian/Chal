const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method is not allowed!' });
  }
  try {

    const messages = await prisma.message.findMany();
    res.status(200).json(messages)
  } catch (err) {
    res.status(500).json({ message: err + "i close the void and burn it all" });
  }
}