import { Repository } from 'typeorm';
import { IOHelper } from '../helpers/io.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { FolderService } from 'src/folder/folder.service';
import { ImageEntity } from '../models/image/image.entity';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageRepository: Repository<ImageEntity>,
        private readonly ioService: IOHelper,
        private readonly folderService: FolderService,
    ) {}

    async getImage(imageId: string) {
        const image = await this.imageRepository.findOne({ where: { id: imageId } });
        if (!image) {
            throw new HttpException('image not found!', 404);
        }
        return image;
    }

    async getImageWithParents(imageId: string, depth?: number) {
        const image = await this.getImage(imageId);
        return await this.imageRepository.manager.getTreeRepository(ImageEntity).findAncestorsTree(image, { depth: depth ? depth : 1 });
    }

    async getImageWithChilds(imageId: string, depth?: number) {
        const image = await this.getImage(imageId);
        return await this.imageRepository.manager.getTreeRepository(ImageEntity).findDescendantsTree(image, { depth: depth ? depth : 1 });
    }

    async createImage(file, folderId) {
        const willBeCreatedFileName = await this.ioService.willBeCreatedFileName(file.originalname, file.size);
        const folder = await this.folderService.getFolder(folderId);
        const imagePath = folder.folderPath + '/' + willBeCreatedFileName;
        const fullStats = await this.ioService.writeImage(file, imagePath);

        return await this.imageRepository.save({
            folderId: folderId,
            imageName: willBeCreatedFileName,
            imageProperties: fullStats,
            imagePath: imagePath,
        });
    }

    async updateImageV2(imageId: string, version) {
        let imageObject = await this.getImage(imageId);
        const { fullStats, updatedPathForObject } = await this.ioService.rotateImageAndWrite(imageObject.imagePath, version);
        var updatedImageName = await this.ioService.willBeUpdatedFileName(imageObject.imageName, version)
        return await this.imageRepository.save({
            folderId: imageObject.folderId,
            imageName: updatedImageName,
            imageProperties: fullStats,
            imagePath: updatedPathForObject,
            parent: { id: imageObject.id },
        });
    }

    async updateImageV3(imageId: string, version) {
        let imageObject = await this.getImage(imageId);
        const { fullStats, updatedPathForObject } = await this.ioService.rotateImageAndWrite(imageObject.imagePath, version);
        var updatedImageName = await this.ioService.willBeUpdatedFileName(imageObject.imageName, version)
        return await this.imageRepository.save({
            folderId: imageObject.folderId,
            imageName: updatedImageName,
            imageProperties: fullStats,
            imagePath: updatedPathForObject,
            parent: { id: imageObject.id },
        });
    }

    async deleteImage(imageId: string) {
        return await this.imageRepository.softDelete(imageId);
    }
}
