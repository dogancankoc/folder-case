import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { IOHelper } from '../helpers/io.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from './image.controller';
import { FolderModule } from 'src/folder/folder.module';
import { ImageEntity } from '../models/image/image.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ImageEntity]),
        FolderModule
    ],
    controllers: [ImageController],
    providers:[ImageService, IOHelper]
})
export class ImageModule { }
