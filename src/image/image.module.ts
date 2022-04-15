import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from '../models/image/image.entity';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { IOHelper } from '../helpers/io.helper';

@Module({
    imports: [
        TypeOrmModule.forFeature([ImageEntity])
    ],
    controllers: [ImageController],
    providers:[ImageService, IOHelper]
})
export class ImageModule { }
