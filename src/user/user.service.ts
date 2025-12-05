import { Injectable } from '@nestjs/common';
import { CreateUserZodDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {
        return await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: { hashedRefreshToken },
        });
    }

    async create(createUserDto: CreateUserZodDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                avatarUrl: true,
            },
        });

        // const { password, ...safeUser } = user;
        return user;
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findFirst({
            where: {
                email,
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.user.findFirst({
            where: {
                id,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
                hashedRefreshToken: true,
                role: true,
            },
        });
    }

    async remove(id: number) {
        return await this.prisma.user.delete({ where: { id } });
    }

    // findAll() {
    //     return `This action returns all user`;
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} user`;
    // }

    // update(id: number, updateUserDto: UpdateUserDto) {
    //     return `This action updates a #${id} user`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} user`;
    // }
}
