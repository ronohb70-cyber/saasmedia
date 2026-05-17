import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

@Processor('publish-post')
export class PostProcessor extends WorkerHost {
  private readonly logger = new Logger(PostProcessor.name);

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);
    const { postId, platform, accessToken, content } = job.data;
    
    // In a real app, we would import the SocialModule here or use a shared library
    // to call the appropriate platform adapter.
    this.logger.log(`Simulating post publishing for postId: ${postId} to ${platform}`);
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.logger.log(`Successfully published job ${job.id}`);
    return { success: true, platformPostId: `mock_${Date.now()}` };
  }
}
