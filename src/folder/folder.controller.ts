import { Controller, Get, Post, Put, Param, Body, ParseUUIDPipe, Delete } from "@nestjs/common"
import { FolderService } from "./folder.service"
import { CreateFolderDto, UpdateFolderDto } from "../models/folder/folder.dto"

@Controller('folder') 
export class FolderController {

    constructor(private readonly folderService: FolderService) {}

    @Get('/:folderId')
    async getfolderById(
        @Param('folderId', new ParseUUIDPipe()) folderId: string
    ) {
        return await this.folderService.getFolder(folderId)
    }
    
    @Get('/getParents/:folderId/:depth')
    async getFolderByIdWithParents(
        @Param('folderId', new ParseUUIDPipe()) folderId: string,
        @Param('depth') depth: number
    ) {
        return await this.folderService.getFolderWithParents(folderId, depth)
    }

    @Get('/getChilds/:folderId/:depth')
    async getFolderByIdWithChilds(
        @Param('folderId', new ParseUUIDPipe()) folderId: string,
        @Param('depth') depth: number
    ) {
        return await this.folderService.getFolderWithChilds(folderId, depth)
    }

    @Post() 
    async createfolder( @Body() body: CreateFolderDto ) {
        return await this.folderService.createFolder(body)
    }

    @Put('/:folderId')
    async updateFolder(
        @Param('folderId', new ParseUUIDPipe()) folderId: string,
        @Body() body: UpdateFolderDto
    ) {
        return await this.folderService.updateFolder(body, folderId)
    }

    @Delete('/:folderId')
    async deleteFolder(
        @Param('folderId', new ParseUUIDPipe()) folderId: string,
    ) {
        return await this.folderService.deleteFolder(folderId)
    }
}
