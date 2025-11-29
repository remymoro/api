import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { Prisma, User } from '@prisma/client';
import { Errors } from '@/common/errors/errors';
import { AppError, makeError } from '@/common/errors';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // ===== FIND =====

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  // ===== CREATE =====

  async create(data: Prisma.UserCreateInput): Promise<User> {
    // 1️⃣ Vérifier doublon username
    if ((data as any).username) {
      const existing = await this.findByUsername((data as any).username);
      if (existing) {
        throw Errors.UserAlreadyExists({
          fieldErrors: { username: 'Le nom d\'utilisateur est déjà utilisé.' },
        });
      }
    }

    // 2️⃣ Vérifier doublon email
    if ((data as any).email) {
      const existingEmail = await this.findByEmail((data as any).email);
      if (existingEmail) {
        throw Errors.UserInvalidEmail({
          fieldErrors: { email: "L'adresse e-mail est déjà utilisée." },
        });
      }
    }

    // 3️⃣ Si on connecte un center, vérifier qu'il existe
    const centerConnect = (data as any).center?.connect?.id;
    if (centerConnect) {
      const center = await this.prisma.center.findUnique({ where: { id: centerConnect } });
      if (!center) {
        throw Errors.CenterNotFound();
      }
    }

    // 3.1️⃣ Règle métier : RESPONSABLE et BENEVOLE doivent être rattachés à un centre
    const role = (data as any).role as string | undefined;
    if (role === 'RESPONSABLE' || role === 'BENEVOLE') {
      if (!centerConnect) {
        throw Errors.UserMustHaveCenter();
      }
    }

    // 4️⃣ Création via Prisma (fallback pour contraintes DB)
    return this.prisma.user.create({ data });
  }

  // ===== UPDATE =====
  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    // ⚠️ Vérifications métier avant la mise à jour
    const existing = await this.findById(id);
    if (!existing) {
      throw Errors.UserNotFound();
    }

    const newRole = (data as any).role as string | undefined;
    const centerConnect = (data as any).center?.connect?.id;
    const centerDisconnect = (data as any).center?.disconnect;

    // Empêcher déconnexion d'un centre si l'utilisateur est RESPONSABLE/BENEVOLE
    if (centerDisconnect && (existing.role === 'RESPONSABLE' || existing.role === 'BENEVOLE')) {
      throw Errors.UserMustHaveCenter();
    }

    // Si on change le rôle vers RESPONSABLE/BENEVOLE, s'assurer qu'il y a un centre connecté
    if (newRole === 'RESPONSABLE' || newRole === 'BENEVOLE') {
      const resultingCenterId = centerConnect ?? existing.centerId;
      if (!resultingCenterId) {
        throw Errors.UserMustHaveCenter();
      }
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // ===== DELETE =====
 async delete(id: number, currentUserId: number): Promise<User> {
  // 1️⃣ Conserver les règles métier
  if (id === currentUserId) {
    throw Errors.UserCannotDeleteSelf();
  }

  // 2️⃣ Vérifier si l'utilisateur existe
  const user = await this.prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw Errors.UserNotFound();
  }

  // 3️⃣ Empêcher de supprimer le dernier admin
  if (user.role === 'ADMIN') {
    const adminCount = await this.prisma.user.count({
      where: { role: 'ADMIN' },
    });

    if (adminCount <= 1) {
      throw Errors.UserIsLastAdmin();
    }
  }

  // 4️⃣ Suppression réelle
  return this.prisma.user.delete({
    where: { id },
  });
}

}
