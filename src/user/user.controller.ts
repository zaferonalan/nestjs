import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import type { CreateUserZodDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { getUserProfileSchema } from './dto/getProfile-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() createUserDto: CreateUserZodDto) {
        return this.userService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() req: Request) {
        const user = await this.userService.findOne(req.user.id);
        return getUserProfileSchema.parse(user);
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
