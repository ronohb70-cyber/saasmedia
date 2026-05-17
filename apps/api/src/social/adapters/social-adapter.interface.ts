export interface SocialPostPayload {
  content: string;
  mediaUrls?: string[];
}

export interface SocialPostResponse {
  success: boolean;
  platformPostId?: string;
  error?: string;
}

export interface SocialPlatformAdapter {
  platformName: string;

  /**
   * Post content to the social media platform
   */
  publishPost(accessToken: string, payload: SocialPostPayload): Promise<SocialPostResponse>;

  /**
   * Verify if a given access token is still valid
   */
  verifyToken(accessToken: string): Promise<boolean>;
}
