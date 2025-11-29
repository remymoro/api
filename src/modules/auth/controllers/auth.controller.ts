import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Res,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../decorators/public.decorator';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { User } from '../decorators/user.decorator';
import { toAuthUser } from '../mappers/auth-user.mapper';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ============================================================
  // 🔵 WHOAMI — retourne le user connecté depuis le cookie
  // ============================================================
  @Get('me')
  getMe(@User() user) {
    return { user: toAuthUser(user) };
  }

  // ============================================================
  // 🔐 LOGIN — via username + password (LocalStrategy)
  // Place le JWT dans un cookie HTTP-only
  // ============================================================
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Request() req,
    @Body() _dto: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, access_token } = await this.authService.login(req.user);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 1000 * 60 * 15,
      path: '/',
    });

    return { user: toAuthUser(user) };
  }

  // ============================================================
  // 🟢 REGISTER — auto-login + cookie
  // ============================================================
  @Public()
  @Post('register')
  async register(
    @Body() dto: RegisterRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, access_token } = await this.authService.register(dto);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 1000 * 60 * 15,
      path: '/',
    });

    return { user: toAuthUser(user) };

  }

  // ============================================================
  // 🔴 LOGOUT — suppression cookie
  // ============================================================
  @Public()
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', { path: '/' });

    return {
      message: 'Déconnexion réussie.',
    };
  }
}
