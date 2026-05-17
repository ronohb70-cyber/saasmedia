import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { FacebookAdapter } from './adapters/facebook.adapter';
import { InstagramAdapter } from './adapters/instagram.adapter';
import { LinkedInAdapter } from './adapters/linkedin.adapter';
import { XAdapter } from './adapters/x.adapter';
import { TikTokAdapter } from './adapters/tiktok.adapter';

@Module({
  providers: [
    SocialService,
    FacebookAdapter,
    InstagramAdapter,
    LinkedInAdapter,
    XAdapter,
    TikTokAdapter,
  ],
  exports: [SocialService],
})
export class SocialModule {}
