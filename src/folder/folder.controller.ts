import {
    Get,
    Post,
    Put,
    Param,
    Body,
    Delete,
    Controller,
    ParseUUIDPipe,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto, UpdateFolderDto } from '../models/folder/folder.dto';

@Controller('folder')
export class FolderController {
    constructor(private readonly folderService: FolderService) {}

    @Get('/:folderId')
    getfolderById(
        @Param('folderId', new ParseUUIDPipe()) folderId: string,
    ) {
        return this.folderService.getFolder(folderId);
    }

    @Get('/getParents/:folderId/:depth')
    getFolderByIdWithParents(
        @Param('folderId', new ParseUUIDPipe()) folderId: string,
        @Param('depth') depth: number,
    ) {
        return this.folderService.getFolderWithParents(folderId, depth);
    }

    @Get('/getChilds/:folderId/:depth')
    getFolderByIdWithChilds(
        @Param('folderId', new ParseUUIDPipe()) folderId: string,
        @Param('depth') depth: number,
    ) {
        return this.folderService.getFolderWithChilds(folderId, depth);
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    createfolder(@Body() body: CreateFolderDto) {
        return this.folderService.createFolder(body);
    }

    @Put('/:folderId')
    updateFolder(
        @Param('folderId', new ParseUUIDPipe()) folderId: string,
        @Body() body: UpdateFolderDto,
    ) {
        return this.folderService.updateFolder(body, folderId);
    }

    @Delete('/:folderId')
    deleteFolder(
        @Param('folderId', new ParseUUIDPipe()) folderId: string,
    ) {
        return this.folderService.deleteFolder(folderId);
    }
}
