import { Injectable, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateCenterDto } from '../dto/update-center.dto';
import { CreateCenterDto } from '../dto/create-center.dto';

@Injectable()
export class CentersService {
  private readonly logger = new Logger(CentersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCenterDto) {

  // Vérification si le centre existe déjà
  const exists = await this.prisma.center.findFirst({
    where: {
      name: data.name,
    },
  });

  if (exists) {
    throw new BadRequestException(
      `Un centre avec le nom "${data.name}" existe déjà`
    );
  }

  const created = await this.prisma.center.create({
    data,
  });


  return created;
}

  async findAll() {
    this.logger.log('Fetching all centers');

    return this.prisma.center.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    this.logger.log(`Fetching center #${id}`);

    const center = await this.prisma.center.findUnique({
      where: { id },
    });

    if (!center) {
      this.logger.warn(`Center #${id} not found`);
      throw new NotFoundException(`Center #${id} not found`);
    }

    this.logger.log(`Center #${id} found`);
    return center;
  }

  async update(id: number, data: UpdateCenterDto) {
    this.logger.log(`Updating center #${id} with data: ${JSON.stringify(data)}`);

    const center = await this.findOne(id); // Already logs if not found

    const updated = await this.prisma.center.update({
      where: { id },
      data,
    });

    this.logger.log(`Center #${id} updated successfully`);

    return updated;
  }

  async remove(id: number) {
    this.logger.log(`Removing center #${id}`);

    const center = await this.findOne(id); 

    const deleted = await this.prisma.center.delete({
      where: { id },
    });

    this.logger.log(`Center #${id} deleted successfully`);

    return deleted;
  }
}
