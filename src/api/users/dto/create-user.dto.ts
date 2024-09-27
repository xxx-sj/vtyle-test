import { Age, Gender, Language, Server, VoiceAvailability } from '@app/api/users/schemas/user.types';

export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  friendKey: string;
  vrChatId: string;
  gender: Gender;
  age: Age;
  language: Language[];
  voiceAvailability: VoiceAvailability;
  server: Server[];
}