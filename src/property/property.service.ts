import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePropertyZodDto } from './dto/createPropertyZod.tdo';

@Injectable()
export class PropertyService {
    constructor(private readonly prisma: PrismaService) { }

    async findOne() { }
    async findAll() { }
    async create(dto: CreatePropertyZodDto) {
        return await this.prisma.property.create({ data: dto });
    }
    async update() { }
}
