import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import AppError from '@shared/errors/AppError';
import { RateLimiterRedis } from 'rate-limiter-flexible';
// IP + quantidade de requisições

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined,
}); 

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'ratelimit',
    points: 5, // quantas requisições a gente permite a cada segundo por IP
    duration: 1,
});

export default async function rateLimiter(request: Request, response: Response, next: NextFunction) {
    try {
        await limiter.consume(request.ip);
        return next();
    } catch(err) {
        throw new AppError('Too many requests', 429);
    }
}