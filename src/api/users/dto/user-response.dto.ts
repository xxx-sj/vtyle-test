import { Expose } from 'class-transformer';

class ThumbnailResponse {
  profileId?: string;
  profileUrl?: string;
  rating?: number;
}

export class UserResponseDto {
  @Expose()
  id?: string;
  @Expose()
  username?: string;
  @Expose()
  email?: string;
  @Expose()
  friendKey?: string;
  @Expose()
  vrChatId?: string;
  @Expose()
  gender?: string;
  @Expose()
  age?: string;
  @Expose()
  language?: string[];
  @Expose()
  voiceAvailability?: string;
  @Expose()
  server?: string[];
  @Expose()
  thumbnail?: ThumbnailResponse;
}