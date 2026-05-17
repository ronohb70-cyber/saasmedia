export class CreatePostDto {
  content: string;
  platforms: string[];
  scheduledAt: string; // ISO 8601 datetime string
  mediaUrls?: string[];
}

export class UpdatePostDto {
  content?: string;
  platforms?: string[];
  scheduledAt?: string;
  mediaUrls?: string[];
  status?: 'DRAFT' | 'SCHEDULED';
}
