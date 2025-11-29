import { User } from '@prisma/client';
import { AuthUserDto } from '../dtos/auth-user.dto';

export function toAuthUser(user: User): AuthUserDto {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    centerId: user.centerId,
  };
}
