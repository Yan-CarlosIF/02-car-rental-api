import { AppError } from "@shared/errors/app-error";
import type { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "redis";

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 10,
  duration: 5,
});

export default async function rateLimiter(
  request: Request,
  _: Response,
  next: NextFunction
) {
  try {
    if (!request.ip) {
      throw new AppError("IP not found", 404);
    }

    await limiter.consume(request.ip);

    return next();
  } catch {
    throw new AppError("Too many requests", 429);
  }
}
