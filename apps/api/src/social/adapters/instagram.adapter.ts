import { Injectable, Logger } from '@nestjs/common';
import { SocialPlatformAdapter, SocialPostPayload, SocialPostResponse } from './social-adapter.interface';

@Injectable()
export class InstagramAdapter implements SocialPlatformAdapter {
  platformName = 'INSTAGRAM';
  private readonly logger = new Logger(InstagramAdapter.name);

  async publishPost(accessToken: string, payload: SocialPostPayload): Promise<SocialPostResponse> {
    this.logger.log(`Publishing to Instagram with token ${accessToken.substring(0, 5)}...`);
    // Production: Use Instagram Graph API
    // Step 1: POST /me/media  → creates media container
    // Step 2: POST /me/media_publish → publishes container
    // e.g.:
    // const container = await axios.post(`https://graph.facebook.com/v19.0/${igUserId}/media`, {
    //   caption: payload.content, image_url: payload.mediaUrls?.[0], access_token: accessToken
    // });
    // await axios.post(`https://graph.facebook.com/v19.0/${igUserId}/media_publish`, {
    //   creation_id: container.data.id, access_token: accessToken
    // });
    return {
      success: true,
      platformPostId: `ig_${Date.now()}`,
    };
  }

  async verifyToken(accessToken: string): Promise<boolean> {
    this.logger.log('Verifying Instagram token...');
    // Production: GET /debug_token on Graph API
    return true;
  }
}
