import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { Errors } from '@/common/errors';
import { CreateCenterDto } from '../dto/create-center.dto';
import { UpdateCenterDto } from '../dto/update-center.dto';

@Injectable()
export class CentersService {
  private readonly logger = new Logger(CentersService.name);

  constructor(private readonly prisma: PrismaService) {}

  // ----------------------------------------------------
  // CREATE
  // ----------------------------------------------------
  async create(dto: CreateCenterDto) {
    this.logger.log(`Creating center: ${dto.name}`);

    // 1️⃣ Doublon name → erreur métier
    const nameExists = await this.prisma.center.findFirst({
      where: { name: dto.name },
    });

    if (nameExists) {
      throw Errors.CenterAlreadyExists({
        fieldErrors: {
          name: `Le centre "${dto.name}" existe déjà.`,
        },
      });
    }

    // 2️⃣ Doublon email (si email fourni)
    if (dto.email) {
      const emailExists = await this.prisma.center.findFirst({
        where: { email: dto.email },
      });

      if (emailExists) {
        throw Errors.CenterInvalidEmail({
          fieldErrors: {
            email: `L'adresse e-mail "${dto.email}" est déjà utilisée.`,
          },
        });
      }
    }

    // 3️⃣ Laisse Prisma gérer les contraintes techniques
    return this.prisma.center.create({
      data: dto,
    });
  }

  // ----------------------------------------------------
  // FIND ALL
  // ----------------------------------------------------
  async findAll() {
    this.logger.log('Fetching all centers');
    return this.prisma.center.findMany({
      orderBy: { id: 'asc' },
    });
  }

  // ----------------------------------------------------
  // FIND ONE
  // ----------------------------------------------------
  async findOne(id: number) {
    this.logger.log(`Fetching center #${id}`);

    const center = await this.prisma.center.findUnique({
      where: { id },
    });

    if (!center) {
      throw Errors.CenterNotFound();
    }

    return center;
  }

  // ----------------------------------------------------
  // UPDATE
  // ----------------------------------------------------
  async update(id: number, dto: UpdateCenterDto) {
    this.logger.log(`Updating center #${id}`);

    // 1️⃣ Vérifier existence
    await this.findOne(id);


     if (dto.name) {
      const nameUsedByOther = await this.prisma.center.findFirst({
        where: {
          name: dto.name,
          id: { not: id },
        },
      });

      if (nameUsedByOther) {
        throw Errors.CenterAlreadyExists({
          fieldErrors: {
            name: `Le centre "${dto.name}" existe déjà.`,
          },
        });
      }
    }

    // 2️⃣ Vérification doublon email (si email modifié)
    if (dto.email) {
      const emailUsedByOther = await this.prisma.center.findFirst({
        where: {
          email: dto.email,
          id: { not: id },
        },
      });

      if (emailUsedByOther) {
        throw Errors.CenterInvalidEmail({
          fieldErrors: {
            email: `L'adresse e-mail "${dto.email}" est déjà utilisée.`,
          },
        });
      }
    }

    // 3️⃣ Prisma P2025/FK error → handled by error.factory
    return this.prisma.center.update({
      where: { id },
      data: dto,
    });
  }

  // ----------------------------------------------------
  // DELETE
  // ----------------------------------------------------
  async remove(id: number) {
    this.logger.log(`Deleting center #${id}`);

    // 1️⃣ Vérifier existence
    await this.findOne(id);

    // 2️⃣ Prisma P2025 sera interceptée par error.factory
    return this.prisma.center.delete({
      where: { id },
    });
  }
}
