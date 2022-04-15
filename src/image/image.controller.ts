import { Controller, Get, Post, Put, Param, Body, ParseUUIDPipe, Delete, UseInterceptors, UploadedFile } from "@nestjs/common"
import { ImageService } from "./image.service"
import { CreateImageDto } from "../models/image/image.dto"
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from 'fs';






@Controller('image') 
export class ImageController {

    constructor(private readonly imageService: ImageService) {}

    // @Get('/:imageId')
    // async getImageById(
    //     @Param('imageId', new ParseUUIDPipe()) imageId: string
    // ) {
    //     return await this.imageService.getImage(imageId)
    // }
    
    // @Get('/getParents/:imageId/:depth')
    // async getImageByIdWithParents(
    //     @Param('imageId', new ParseUUIDPipe()) imageId: string,
    //     @Param('depth') depth: number
    // ) {
    //     return await this.imageService.getImageWithParents(imageId, depth)
    // }

    // @Get('/getChilds/:imageId/:depth')
    // async getImageByIdWithChilds(
    //     @Param('imageId', new ParseUUIDPipe()) imageId: string,
    //     @Param('depth') depth: number
    // ) {
    //     return await this.imageService.getImageWithChilds(imageId, depth)
    // }

    @Post()  
    @UseInterceptors(FileInterceptor('file'))
    async createfolder( 
        @Body() body: CreateImageDto,
        @UploadedFile() file: Express.Multer.File ) {
           var fileeeee = file
         
           
           //var bbbbbbbb = await fs.readFileSync(fileeeee.path);

           //console.log(bbbbbbbb);
          //const exifrMetadata = await exifr.parse(fileeeee[]);

            console.log(file);
        //return await this.imageService.createImage(body)
        return "";
    }


















    // @Put('/:imageId')
    // async updateFolder(
    //     @Param('imageId', new ParseUUIDPipe()) imageId: string,
    //     @Body() body: UpdateFolderDto
    // ) {
    //     return await this.imageService.updateFolder(body, imageId)
    // }

    // @Delete('/:imageId')
    // async deleteFolder(
    //     @Param('imageId', new ParseUUIDPipe()) imageId: string,
    // ) {
    //     return await this.imageService.deleteFolder(imageId)
    // }
}
