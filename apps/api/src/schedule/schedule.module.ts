import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ScheduleService } from './schedule.service';
import { PostsController } from './posts.controller';
import { AuthModule } from '../auth/auth.module';
import { PostProcessor } from './post.processor';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'publish-post' }),
    AuthModule, // Import so AuthGuard is available
  ],
  controllers: [PostsController],
  providers: [ScheduleService, PostProcessor],
  exports: [ScheduleService],
})
export class ScheduleModule {}
