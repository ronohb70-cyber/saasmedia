import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(WorkerModule);
  // The application context is running, BullMQ workers will start processing
  console.log('Worker application started');
}
bootstrap();
