import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(@InjectQueue('publish-post') private publishQueue: Queue) {}

  async schedulePost(postId: string, platform: string, accessToken: string, content: string, delayMs: number = 0) {
    this.logger.log(`Scheduling post ${postId} for platform ${platform} with delay ${delayMs}ms`);
    
    await this.publishQueue.add('publish', {
      postId,
      platform,
      accessToken,
      content,
    }, {
      delay: delayMs,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    });
    
    return { success: true };
  }
}
