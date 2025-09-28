import {
    Body,
    Controller,
    Get,
    Param,
    ParseBoolPipe,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';

@Controller('property')
export class PropertyController {
    // @Get()
    // findAll() {
    //   return 'All property';
    // }

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
        console.log(typeof id);
        console.log(typeof short);
        return id;
    }

    @Post()
    create(
        @Body()
        body: CreatePropertyDto,
    ) {
        return body;
    }

    @Patch(':id')
    update(
        @Param() { id }: IdParamDto,
        @Body()
        body: CreatePropertyDto,
    ) {
        return body;
    }
}
