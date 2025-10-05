import {
    Body,
    Controller,
    Get,
    Headers,
    Param,
    ParseBoolPipe,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { PropertyService } from './property.service';
import type { CreatePropertyZodDto } from './dto/createPropertyZod.tdo';

@Controller('property')
export class PropertyController {
    constructor(private propertyService: PropertyService) { }

    @Get()
    findAll() {
        return this.propertyService.findAll();
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.propertyService.findOne();
    }

    @Post()
    create(@Body() dto: CreatePropertyZodDto) {
        return this.propertyService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body()
        body: CreatePropertyDto,
        @Headers('host') header: string,
    ) {
        return this.propertyService.update();
    }
}
