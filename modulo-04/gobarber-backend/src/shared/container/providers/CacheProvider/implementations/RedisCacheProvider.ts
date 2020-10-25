import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';

import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
    private client: RedisClient;
    constructor() {
        this.client = new Redis(cacheConfig.config.redis);
    }
    public async save(key: string, value: any): Promise<void> {
        await this.client.set(key, JSON.stringify(value));
    }
    public async recover<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);
        if(!data) return null;

        const parsedData = JSON.parse(data) as T; // ParsedDate é do mesmo tipo que está passando como parâmetro
        
        return parsedData;
    }
    public async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }
    public async invalidatePrefix(prefix: string): Promise<void> {
        const keys = await this.client.keys(`${prefix}:*`) // procura todas as keys que começam com prefix e que tenham qualquer coisa depois
        const pipeline = this.client.pipeline();
        keys.forEach(key => pipeline.del(key));

        await pipeline.exec();
    }   

}