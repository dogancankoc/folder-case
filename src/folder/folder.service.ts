import { IOHelper } from './../helpers/io.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository, getConnection } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { FolderEntity } from '../models/folder/folder.entity';
import { CreateFolderDto, UpdateFolderDto } from '../models/folder/folder.dto';

@Injectable()
export class FolderService {
    constructor(
        @InjectRepository(FolderEntity)
        private folderRepository: TreeRepository<FolderEntity>,
        private readonly ioService: IOHelper,
    ) {
        this.folderRepository = getConnection().getTreeRepository(FolderEntity);
    }

    async getFolder(folderId: string) {
        const folder = await this.folderRepository.findOne({
            where: { id: folderId },
        });
        if (!folder) {
            throw new HttpException('folder not found!', 404);
        }
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
        let parentFolder, folderPath;

        const entity = this.folderRepository.manager.create(FolderEntity, folder);

        const parentFolderId = folder?.parent?.id;
        if (parentFolderId) {
            parentFolder = await this.getFolder(parentFolderId);
        }

        let createdFolder = await this.folderRepository.save(entity);

        folderPath = createdFolder.id;
        if (parentFolder)  {
            folderPath = parentFolder.folderPath + '/' + folderPath;
        }

        const updateResult = await this.folderRepository.update(
            { id: createdFolder.id }, 
            { folderPath }
        );

        if (updateResult.affected) {
            this.ioService.checkAndCreateNewFolder(folderPath);
            createdFolder = await this.folderRepository.findOne(createdFolder.id);
        }

        return createdFolder;
    }

    async updateFolder(toBeUpdatedFolderDto: UpdateFolderDto, folderId: string) {
        var folder = await this.getFolder(folderId);
        var tempPathForMoveProcess = folder.folderPath;
        folder.folderName = toBeUpdatedFolderDto.folderName ? toBeUpdatedFolderDto.folderName : folder.folderName;
        folder.updatedAt = new Date();

        if (toBeUpdatedFolderDto.parent !== undefined && toBeUpdatedFolderDto.parent.id !== undefined) {
            var parentFolder = await this.getFolder(toBeUpdatedFolderDto.parent.id);
            folder.parent = toBeUpdatedFolderDto.parent;
            folder.folderPath = parentFolder.folderPath + '/' + folder.id;
        }

        var result = await this.folderRepository.save(folder);
        if (result) {
            this.ioService.checkAndMoveFolder(tempPathForMoveProcess, folder.folderPath);
        }
        return result;
    }

    async deleteFolder(folderId: string) {
        return await this.folderRepository.softDelete(folderId);
    }

}
