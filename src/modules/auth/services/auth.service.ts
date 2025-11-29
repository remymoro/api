import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '@/modules/users/services/users.service';
import { User } from '@prisma/client';

import { AccessToken } from '../dtos/access-token.type';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { Errors } from '@/common/errors/errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * ============================================================
   * 🔐 validateUser
   * Vérifie username + password.
   * Utilisé par LocalStrategy.
   * ============================================================
   */
  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);

    // volontaire : message générique
    if (!user) {
      throw Errors.AuthInvalidCredentials();
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw Errors.AuthInvalidCredentials();
    }

    return user;
  }

  /**
   * ============================================================
   * 🔐 login
   * Le cookie sera ajouté dans le controller.
   * ============================================================
   */
    async login(user: User): Promise<{ user: User; access_token: string }> {
      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        centerId: user.centerId,
      };

      const access_token = this.jwtService.sign(payload, {
        expiresIn: '15m',
      });

      return { user, access_token };
    }

  /**
   * ============================================================
   * 🔐 register
   * Crée un user + login automatique.
   * ============================================================
   */
 async register(dto: RegisterRequestDto): Promise<{ user: User; access_token: string }> {
  // Vérifier si username existe déjà
  const existingUser = await this.usersService.findByUsername(dto.username);
  if (existingUser) {
    throw Errors.AuthUsernameAlreadyExists({
      fieldErrors: { username: "Le nom d'utilisateur est déjà pris." },
    });
  }

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(dto.password, 10);

  // Créer l'utilisateur
  const newUser = await this.usersService.create({
    username: dto.username,
    email: dto.email,
    password: hashedPassword,
    role: dto.role,
    center: dto.centerId
      ? { connect: { id: dto.centerId } }
      : undefined,
  });

  // Générer token (auto-login)
  const { access_token } = await this.login(newUser);

  return { user: newUser, access_token };
}
}
