import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

// In-memory post store — replace with Prisma in production
const postStore: Record<string, any> = {};

@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly scheduleService: ScheduleService) {}

  /**
   * GET /posts
   * List all posts for the current organization
   */
  @Get()
  findAll(@Request() req: any) {
    const { orgId } = req.user;
    const posts = Object.values(postStore).filter((p: any) => p.organizationId === orgId);
    return { data: posts, total: posts.length };
  }

  /**
   * GET /posts/:id
   * Get a single post by ID
   */
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    const post = postStore[id];
    if (!post || post.organizationId !== req.user.orgId) {
      throw new NotFoundException(`Post ${id} not found`);
    }
    return post;
  }

  /**
   * POST /posts
   * Create and schedule a new post
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreatePostDto, @Request() req: any) {
    const { orgId } = req.user;
    const id = `post_${Date.now()}`;
    const scheduledAt = new Date(dto.scheduledAt);
    const delayMs = Math.max(0, scheduledAt.getTime() - Date.now());

    const post = {
      id,
      organizationId: orgId,
      content: dto.content,
      platforms: dto.platforms,
      scheduledAt: scheduledAt.toISOString(),
      mediaUrls: dto.mediaUrls ?? [],
      status: 'SCHEDULED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    postStore[id] = post;

    // Enqueue a job for each platform
    await Promise.all(
      dto.platforms.map((platform) =>
        this.scheduleService.schedulePost(id, platform, 'mock_token', dto.content, delayMs),
      ),
    );

    return post;
  }

  /**
   * PUT /posts/:id
   * Update a scheduled post (only if not yet published)
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto, @Request() req: any) {
    const post = postStore[id];
    if (!post || post.organizationId !== req.user.orgId) {
      throw new NotFoundException(`Post ${id} not found`);
    }
    const updated = {
      ...post,
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    postStore[id] = updated;
    return updated;
  }

  /**
   * DELETE /posts/:id
   * Delete a post and cancel its queue job
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Request() req: any) {
    const post = postStore[id];
    if (!post || post.organizationId !== req.user.orgId) {
      throw new NotFoundException(`Post ${id} not found`);
    }
    delete postStore[id];
  }
}
