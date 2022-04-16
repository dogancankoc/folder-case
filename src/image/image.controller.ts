import { Get, Post, Put, Param, Body, Delete, Controller, UploadedFile, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FolderService } from 'src/folder/folder.service';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService, 
        private readonly folderService: FolderService
        ) {}

    @Get('/:imageId')
    async getImageById(
        @Param('imageId', new ParseUUIDPipe()) imageId: string
    ) {
        return await this.imageService.getImage(imageId)
    }

    @Get('/getParents/:imageId/:depth')
    async getImageByIdWithParents(
        @Param('imageId', new ParseUUIDPipe()) imageId: string,
        @Param('depth') depth: number
    ) {
        return await this.imageService.getImageWithParents(imageId, depth)
    }

    @Get('/getChilds/:imageId/:depth')
    async getImageByIdWithChilds(
        @Param('imageId', new ParseUUIDPipe()) imageId: string,
        @Param('depth') depth: number
    ) {
        return await this.imageService.getImageWithChilds(imageId, depth)
    }

    @Post('/:folderId')
    @UseInterceptors(FileInterceptor('file'))
    async createImage(@Param('folderId', 
            new ParseUUIDPipe()) folderId: string, 
            @UploadedFile() file: Express.Multer.File) {
        return this.imageService.createImage(file, folderId);
    }

    @Put('/v2/:imageId')
    async updateImageV2(
        @Param('imageId', new ParseUUIDPipe()) imageId: string
    ) {
        return await this.imageService.updateImageV2( imageId, "_v2" )
    }

    @Put('/v3/:imageId')
    async updateImageV3(
        @Param('imageId', new ParseUUIDPipe()) imageId: string
    ) {
        return await this.imageService.updateImageV3( imageId, "_v3" );
    }

    @Delete('/:imageId')
    async deleteFolder(
        @Param('imageId', new ParseUUIDPipe()) imageId: string,
    ) {
        return await this.imageService.deleteImage(imageId)
    }
}
