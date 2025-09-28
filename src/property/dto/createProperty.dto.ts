import { IsInt, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
    @IsString()
    name: string;

    @IsString()
    @Length(1, 10, { groups: ['create'] })
    @Length(2, 15, { groups: ['update'] })
    description: string;

    @IsInt()
    area: number;
}
