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
}