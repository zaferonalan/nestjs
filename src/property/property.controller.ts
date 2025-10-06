import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UsePipes,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { createPropertySchema, type CreatePropertyZodDto } from './dto/createPropertyZod.tdo';
import { updatePropertySchema, type updatePropertyZodDto } from './dto/updatePropertyZod.dto';
import { ZodValidationPipe } from 'src/pipes/zodValidationPipe';

@Controller('property')
export class PropertyController {
    constructor(private propertyService: PropertyService) { }

    @Get()
    findAll() {
        return this.propertyService.findAll();
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.propertyService.findOne(id);
    }

    @Post()
    @UsePipes(new ZodValidationPipe(createPropertySchema))
    create(@Body() dto: CreatePropertyZodDto) {
        return this.propertyService.create(dto);
    }

    @Patch(':id')
    @UsePipes(new ZodValidationPipe(updatePropertySchema))
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body()
        body: updatePropertyZodDto,
    ) {
        return this.propertyService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.propertyService.delete(id);
    }
}
