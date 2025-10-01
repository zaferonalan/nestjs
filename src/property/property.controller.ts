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
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdpipes';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { createPropertySchema, type CreatePropertyZodDto } from './dto/createPropertyZod.tdo';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
    constructor(private propertyService: PropertyService) { }
    @Get()
    findAll() {
        return this.propertyService.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return id;
    // }

    // @Get(':id/:slug')
    // findTwo(@Param('id') id: string, @Param('slug') slug: string) {
    //   return `id: ${id}, slug: ${slug}`;
    // }

    // @Post()
    // @HttpCode(HttpStatus.OK)
    // create(@Body() body: { name: string; age: number }) {
    //   return body;
    // }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number, @Query('short', ParseBoolPipe) short) {
        return this.propertyService.findOne();
    }

    @Post()
    @UsePipes(new ZodValidationPipe(createPropertySchema))
    create(
        @Body()
        body: CreatePropertyZodDto,
    ) {
        return this.propertyService.create();
    }

    @Patch(':id')
    update(
        @Param('id', ParseIdPipe) id,
        @Body()
        body: CreatePropertyDto,
        @Headers('host') header: string,
    ) {
        return header;
    }

    // @Patch(':id')
    // update(
    //     @Param() { id }: IdParamDto,
    //     @Body()
    //     body: CreatePropertyDto,
    // ) {
    //     return body;
    // }

    // @Patch(':id')
    // updateCustomPipes(
    //     @Param('id', ParseIdPipe) id,
    //     @Body()
    //     body: CreatePropertyDto,
    //     @RequestHeader(new ValidationPipe({ whitelist: true, validateCustomDecorators: true }))
    //     header: HeadersDto,
    // ) {
    //     return this.propertyService.update();
    // }
}
