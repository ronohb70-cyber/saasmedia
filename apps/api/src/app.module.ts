import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocialModule } from './social/social.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from './schedule/schedule.module';
import { BullModule } from '@nestjs/bullmq';

// Helper to parse Redis URL for ioredis compatibility
const getRedisConnection = () => {
  const urlString = process.env.REDIS_URL || "rediss://default:gQAAAAAAAfQJAAIgcDEzOTJiMGU0ZDFmNzU0ZTZlYTYxZTI4Nzk4NjE4OWJiNw@faithful-seahorse-128009.upstash.io:6379";
  console.log('--- REDIS CONNECTION DIAGNOSTICS ---');
  console.log('REDIS_URL environment variable exists:', !!urlString);
  if (urlString) {
    try {
      const parsed = new URL(urlString);
      const host = parsed.hostname;
      const port = parseInt(parsed.port || '6379', 10);
      console.log('Parsed Redis Host:', host);
      console.log('Parsed Redis Port:', port);
      console.log('Parsed Redis Protocol:', parsed.protocol);
      return {
        host,
        port,
        username: parsed.username ? decodeURIComponent(parsed.username) : undefined,
        password: parsed.password ? decodeURIComponent(parsed.password) : undefined,
        tls: parsed.protocol === 'rediss:' ? {} : undefined,
      };
    } catch (e) {
      console.error('Failed to parse REDIS_URL, falling back to defaults', e);
    }
  }
  console.log('Falling back to localhost:6379 since REDIS_URL is missing or invalid');
  return {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  };
};

@Module({
  imports: [
    // BullMQ — shared Redis connection for all queues
    BullModule.forRoot({
      connection: getRedisConnection() as any,
    }),
    AuthModule,
    SocialModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
