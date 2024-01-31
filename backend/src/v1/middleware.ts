import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

export const authenticationMiddleware = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return reply.code(401).send({ error: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, "jwt-secret");
        // bind the auth field inside the request
        (request as any).auth = decoded;
        // continue with the request
        return;
    } catch (err) {
        return reply.code(401).send({ error: 'Unauthorized' });
    }
};

