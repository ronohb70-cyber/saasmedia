import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocialModule } from './social/social.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from './schedule/schedule.module';
import { BullModule } from '@nestjs/bullmq';

// Helper to parse Redis URL for ioredis compatibility
const getRedisConnection = () => {
  const urlString = process.env.REDIS_URL;
  if (urlString) {
    try {
      const parsed = new URL(urlString);
      return {
        host: parsed.hostname,
        port: parseInt(parsed.port || '6379', 10),
        username: parsed.username ? decodeURIComponent(parsed.username) : undefined,
        password: parsed.password ? decodeURIComponent(parsed.password) : undefined,
        tls: parsed.protocol === 'rediss:' ? {} : undefined,
      };
    } catch (e) {
      console.error('Failed to parse REDIS_URL, falling back to defaults', e);
    }
  }
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
