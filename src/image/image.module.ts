import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from '../models/image/image.entity';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { IOHelper } from '../helpers/io.helper';
import { FolderService } from 'src/folder/folder.service';
import { FolderModule } from 'src/folder/folder.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ImageEntity]),
        FolderModule
    ],
    controllers: [ImageController],
    providers:[ImageService, IOHelper]
})
export class ImageModule { }
