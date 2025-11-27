import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

import { CreateStoreDto } from '../dto/create-store.dto';
import { UpdateStoreDto } from '../dto/update-store.dto';

import { Errors } from 'src/common/errors/errors';
import { errorFactory } from 'src/common/errors/error.factory';

@Injectable()
export class StoresService {
  private readonly logger = new Logger(StoresService.name);

  constructor(private readonly prisma: PrismaService) {}

  // ----------------------------------------------------
  // CREATE
  // ----------------------------------------------------
  async create(dto: CreateStoreDto) {
    this.logger.log(`Creating store: ${dto.name}`);

    // 1️⃣ Vérifier que le center existe
    const centerExists = await this.prisma.center.findUnique({
      where: { id: dto.centerId },
    });

    if (!centerExists) {
      throw Errors.CenterNotFound();
    }

    // 2️⃣ Vérifier qu’aucun magasin n'existe à la même adresse exacte
    const addressExists = await this.prisma.store.findFirst({
      where: {
        address: dto.address,
        city: dto.city,
        codePostal: dto.codePostal,
      },
    });

    if (addressExists) {
      throw Errors.StoreAlreadyExists({
        fieldErrors: {
          address: `Un magasin existe déjà à cette adresse.`,
        },
      });
    }

    // 3️⃣ Création
    try {
      return await this.prisma.store.create({
        data: dto,
      });
    } catch (e) {
      throw errorFactory(e);
    }
  }

  // ----------------------------------------------------
  // FIND ALL
  // ----------------------------------------------------
  async findAll() {
    this.logger.log('Fetching all stores');

    return this.prisma.store.findMany({
      include: { center: true },
      orderBy: { id: 'asc' },
    });
  }

  // ----------------------------------------------------
  // FIND ONE
  // ----------------------------------------------------
  async findOne(id: number) {
    this.logger.log(`Fetching store #${id}`);

    try {
      return await this.prisma.store.findUniqueOrThrow({
        where: { id },
        include: { center: true },
      });
    } catch (e) {
      throw errorFactory(e); // P2025 → StoreNotFound
    }
  }

  // ----------------------------------------------------
  // UPDATE
  // ----------------------------------------------------
  async update(id: number, dto: UpdateStoreDto) {
    this.logger.log(`Updating store #${id}`);

    // 1️⃣ Vérifier existence
    await this.findOne(id);

    // 2️⃣ Si l’adresse change → vérifier doublon adresse
    if (dto.address || dto.city || dto.codePostal) {
      const exists = await this.prisma.store.findFirst({
        where: {
          address: dto.address,
          city: dto.city,
          codePostal: dto.codePostal,
          id: { not: id },
        },
      });

      if (exists) {
        throw Errors.StoreAlreadyExists({
          fieldErrors: {
            address: 'Un autre magasin existe déjà à cette adresse.',
          },
        });
      }
    }

    // 3️⃣ Update
    try {
      return await this.prisma.store.update({
        where: { id },
        data: dto,
      });
    } catch (e) {
      throw errorFactory(e);
    }
  }

  // ----------------------------------------------------
  // DELETE
  // ----------------------------------------------------
  async remove(id: number) {
    this.logger.log(`Deleting store #${id}`);

    // Vérifier existence
    await this.findOne(id);

    try {
      return await this.prisma.store.delete({
        where: { id },
      });
    } catch (e) {
      throw errorFactory(e);
    }
  }
}
