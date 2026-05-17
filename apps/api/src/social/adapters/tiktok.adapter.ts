import { Injectable, Logger } from '@nestjs/common';
import { SocialPlatformAdapter, SocialPostPayload, SocialPostResponse } from './social-adapter.interface';

@Injectable()
export class TikTokAdapter implements SocialPlatformAdapter {
  platformName = 'TIKTOK';
  private readonly logger = new Logger(TikTokAdapter.name);

  async publishPost(accessToken: string, payload: SocialPostPayload): Promise<SocialPostResponse> {
    this.logger.log(`Publishing to TikTok with token ${accessToken.substring(0, 5)}...`);
    // Production: Use TikTok Content Posting API
    // Step 1: POST https://open.tiktokapis.com/v2/post/publish/inbox/video/init/
    //         → returns publish_id
    // Step 2: Upload video to the returned upload_url
    // Step 3: POST https://open.tiktokapis.com/v2/post/publish/status/fetch/
    //         → poll until status is PUBLISH_COMPLETE
    // Note: TikTok requires video content, text-only posts go to inbox
    return {
      success: true,
      platformPostId: `tt_${Date.now()}`,
    };
  }

  async verifyToken(accessToken: string): Promise<boolean> {
    this.logger.log('Verifying TikTok token...');
    // Production: GET https://open.tiktokapis.com/v2/user/info/
    return true;
  }
}
