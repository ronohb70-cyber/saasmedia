import { Injectable, Logger } from '@nestjs/common';
import { SocialPlatformAdapter, SocialPostPayload, SocialPostResponse } from './adapters/social-adapter.interface';
import { FacebookAdapter } from './adapters/facebook.adapter';
import { InstagramAdapter } from './adapters/instagram.adapter';
import { LinkedInAdapter } from './adapters/linkedin.adapter';
import { XAdapter } from './adapters/x.adapter';
import { TikTokAdapter } from './adapters/tiktok.adapter';

@Injectable()
export class SocialService {
  private adapters = new Map<string, SocialPlatformAdapter>();
  private readonly logger = new Logger(SocialService.name);

  constructor(
    private readonly facebookAdapter: FacebookAdapter,
    private readonly instagramAdapter: InstagramAdapter,
    private readonly linkedInAdapter: LinkedInAdapter,
    private readonly xAdapter: XAdapter,
    private readonly tikTokAdapter: TikTokAdapter,
  ) {
    [facebookAdapter, instagramAdapter, linkedInAdapter, xAdapter, tikTokAdapter].forEach(
      (adapter) => this.registerAdapter(adapter),
    );
  }

  private registerAdapter(adapter: SocialPlatformAdapter) {
    this.adapters.set(adapter.platformName, adapter);
    this.logger.log(`Registered adapter for platform: ${adapter.platformName}`);
  }

  getAdapter(platformName: string): SocialPlatformAdapter {
    const adapter = this.adapters.get(platformName.toUpperCase());
    if (!adapter) {
      throw new Error(`No adapter found for platform: ${platformName}`);
    }
    return adapter;
  }

  getSupportedPlatforms(): string[] {
    return Array.from(this.adapters.keys());
  }

  async publishToMultiplePlatforms(
    platforms: string[],
    tokens: Record<string, string>,
    payload: SocialPostPayload,
  ): Promise<Record<string, SocialPostResponse>> {
    const results: Record<string, SocialPostResponse> = {};
    await Promise.allSettled(
      platforms.map(async (platform) => {
        try {
          const adapter = this.getAdapter(platform);
          const token = tokens[platform];
          if (!token) {
            results[platform] = { success: false, error: 'No access token for platform' };
            return;
          }
          results[platform] = await adapter.publishPost(token, payload);
        } catch (err: any) {
          results[platform] = { success: false, error: err.message };
        }
      }),
    );
    return results;
  }
}
