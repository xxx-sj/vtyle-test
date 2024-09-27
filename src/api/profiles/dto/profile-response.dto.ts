import { Expose } from 'class-transformer';

export class ProfileResponseDto {
  @Expose()
  id?: string;
  @Expose()
  username?: string;
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
  profileUrl?: string;
  @Expose()
  rating?: number;
}
