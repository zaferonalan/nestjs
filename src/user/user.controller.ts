import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
    Request,
    ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { CreateUserZodDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { getUserProfileSchema } from './dto/getProfile-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import type { AuthenticatedRequest } from './type/AuthenticatedRequest';
import { RolGuard } from 'src/auth/guards/rol/rol.guard';
// import { UpdateUserDto } from './dto/update-user.dto';

Roles(Role.USER);
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() createUserDto: CreateUserZodDto) {
        return this.userService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req: AuthenticatedRequest) {
        const user = await this.userService.findOne(req.user.id);
        return getUserProfileSchema.parse(user);
    }

    @Roles(Role.ADMIN)
    // @UseGuards(RolGuard)
    // @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.remove(id);
    }

    // @Get()
    // findAll() {
    //     return this.userService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.userService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.userService.update(+id, updateUserDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.userService.remove(+id);
    // }
}
