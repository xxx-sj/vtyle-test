import { Expose } from 'class-transformer';
import { UserResponseDto } from '@app/api/users/dto/user-response.dto';

export class UserProfileResponseDto extends UserResponseDto {
  @Expose()
  isUnlocked: boolean;
}
