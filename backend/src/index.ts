import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import eventRoutes from './routes/eventRoutes.js';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

// Register CORS with specific options
fastify.register(cors, {
  origin: ['https://event-management-system-rouge-rho.vercel.app/'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
});

fastify.register(eventRoutes);

fastify.get('/', async (request, reply) => {
  return { message: 'Welcome to the Event Management System API!' };
});

const startServer = async () => {
  try {
    await prisma.$connect();
    await fastify.listen({ port: 3000, host: '0.0.0.0' }); 
    console.log(`Server is running on http://localhost:3000`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

// Start the server
startServer();

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
