import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis();
  }

  isConnected() {
    if(this.redisClient.status === "ready") {
        return true;
    }
    return false
  }

  async set(key: string, value: string, ttl: number = 60): Promise<string> {
    return this.redisClient.set(key, value, 'EX', ttl);
  }

  async get(key: string): Promise<string> {
    return this.redisClient.get(key);
  }

  async cacheWhenAble(key, callback):Promise<any> {
    const redisKey = this.isConnected() ? key : '';
    const cachedData = this.isConnected() ? await this.get(redisKey) : null;
    const response = JSON.parse(cachedData) || await callback();

    if(this.isConnected() && !cachedData) {
      await this.set(redisKey, JSON.stringify(response), 57600); //expire in 16 hours
    }
    return response
  }
}