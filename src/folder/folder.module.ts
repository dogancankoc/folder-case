import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderService } from './folder.service';
import { IOHelper } from './../helpers/io.helper';
import { FolderController } from './folder.controller';
import { FolderEntity } from '../models/folder/folder.entity';
import { ValidFolderMiddleware } from 'src/common/middlaware/validFolder.middlaware';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([FolderEntity])
    ],
    controllers: [FolderController],
    providers:[FolderService, IOHelper],
    exports: [FolderService]
})
export class FolderModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidFolderMiddleware).forRoutes({
            path:'folders/:folderId',
            method:RequestMethod.GET
        })
    }
}
