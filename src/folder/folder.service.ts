import { CreateFolderDto, UpdateFolderDto } from '../models/folder/folder.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FolderEntity } from '../models/folder/folder.entity';
import { IOHelper } from './../helpers/io.helper';    

@Injectable()
export class FolderService {
    constructor(
        @InjectRepository(FolderEntity)
        private readonly folderRepository: Repository<FolderEntity>,
        private readonly ioService: IOHelper
    ) { }

    async getFolder(folderId: string) {
        const folder = await this.folderRepository.findOne({ where: { id: folderId } });
        if (!folder) { throw new HttpException('folder not found!', 404); }
        return folder;
    }

    async getFolderWithParents(folderId: string, depth?: number) {
        const folder = await this.getFolder(folderId);
        return await this.folderRepository.manager.getTreeRepository(FolderEntity).findAncestorsTree(folder, { depth: depth ? depth : 1 });
    }

    async getFolderWithChilds(folderId: string, depth?: number) {
        const folder = await this.getFolder(folderId);
        return await this.folderRepository.manager.getTreeRepository(FolderEntity).findDescendantsTree(folder, { depth: depth ? depth : 1 });
    }

    async createFolder(folder: CreateFolderDto) {

        if (folder.parent !== undefined && folder.parent.id !== undefined) {

            var parentFolder = await this.getFolder(folder.parent.id);
            var addedFolder = await this.folderRepository.save(folder);
            addedFolder.folderPath = parentFolder.folderPath + "/" + addedFolder.id;
            var result = await this.folderRepository.save(addedFolder);

            if (addedFolder && result) this.ioService.checkAndCreateNewFolder(result.folderPath);
        }
        else {

            var addedFolder = await this.folderRepository.save(folder);
            addedFolder.folderPath = addedFolder.id;
            result = await this.folderRepository.save(addedFolder);

            if (addedFolder && result) this.ioService.checkAndCreateNewFolder(result.folderPath);
        }
        return result;
    }

    async updateFolder(toBeUpdatedFolderDto: UpdateFolderDto, folderId: string) {
        var folder = await this.getFolder(folderId);
        var tempPathForMoveProcess = folder.folderPath;
        folder.folderName = toBeUpdatedFolderDto.folderName ? toBeUpdatedFolderDto.folderName : folder.folderName;
        folder.updatedAt = new Date();

        if (toBeUpdatedFolderDto.parent !== undefined && toBeUpdatedFolderDto.parent.id !== undefined) {
            var parentFolder = await this.getFolder(toBeUpdatedFolderDto.parent.id);
            folder.parent = toBeUpdatedFolderDto.parent;
            folder.folderPath = parentFolder.folderPath + "/" + folder.id;
        }

        var result = await this.folderRepository.save(folder);
        if (result) {
            this.ioService.checkAndMoveFolder(tempPathForMoveProcess, folder.folderPath,)
        }
        return result;
    }

    async deleteFolder(folderId: string) {
        return await this.folderRepository.softDelete(folderId);
    }
}


