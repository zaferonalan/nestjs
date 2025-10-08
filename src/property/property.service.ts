import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePropertyZodDto } from './dto/createPropertyZod.tdo';
import { updatePropertyZodDto } from './dto/updatePropertyZod.dto';
import { PaginationZodDto, paginationZodSchema } from './dto/paginationZod.dto';

@Injectable()
export class PropertyService {
    constructor(private readonly prisma: PrismaService) { }

    async findOne(id: number) {
        const property = await this.prisma.property.findFirst({
            where: {
                id: id,
            },
        });

        if (!property) throw new NotFoundException();

        return property;
    }
    async findAll(query: PaginationZodDto) {
        const pagination = paginationZodSchema.parse(query);
        const { limit, skip } = pagination;
        const propertyAll = await this.prisma.property.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
            },
            take: limit,
            skip: skip,
        });

        if (propertyAll.length == 0) throw new NotFoundException();
        return propertyAll;
    }
    async create(dto: CreatePropertyZodDto) {
        return await this.prisma.property.create({ data: dto });
    }
    async update(id: number, dto: updatePropertyZodDto) {
        return await this.prisma.property.update({
            where: { id },
            data: { ...dto },
        });
    }

    async delete(id: number) {
        return await this.prisma.property.delete({
            where: {
                id,
            },
        });
    }
}
