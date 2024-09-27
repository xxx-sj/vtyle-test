import { Module } from '@nestjs/common';
import { UsersModule } from '@app/api/users/users.module';
import { ProfilesModule } from '@app/api/profiles/profiles.module';

@Module({
  imports: [UsersModule, ProfilesModule],
})
export class ApiModule {}
