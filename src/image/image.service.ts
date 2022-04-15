import { CreateImageDto } from '../models/image/image.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from '../models/image/image.entity';
import { IOHelper } from '../helpers/io.helper';    

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageRepository: Repository<ImageEntity>,
        private readonly ioService: IOHelper
    ) { }

    async getImage(imageId: string) {
        const image = await this.imageRepository.findOne({ where: { id: imageId } });
        if (!image) { throw new HttpException('image not found!', 404); }
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

    async createimage(image: CreateImageDto) {

        // if (image.parent !== undefined && image.parent.id !== undefined) {

        //     var parentimage = await this.getImage(image.parent.id);
        //     var addedimage = await this.imageRepository.save(image);
        //     addedimage.imagePath = parentimage.imagePath + "/" + addedimage.id;
        //     var result = await this.imageRepository.save(addedimage);

        //     if (addedimage && result) this.ioService.checkAndCreateNewimage(result.imagePath);
        // }
        // else {

        //     var addedimage = await this.imageRepository.save(image);
        //     addedimage.imagePath = addedimage.id;
        //     result = await this.imageRepository.save(addedimage);

        //     if (addedimage && result) this.ioService.checkAndCreateNewimage(result.imagePath);
        // }
        // return result;
    }

    // async updateImage(toBeUpdatedimageDto: UpdateimageDto, imageId: string) {
    //     var image = await this.getImage(imageId);
    //     var tempPathForMoveProcess = image.imagePath;
    //     image.imageName = toBeUpdatedimageDto.imageName ? toBeUpdatedimageDto.imageName : image.imageName;
    //     image.updatedAt = new Date();

    //     if (toBeUpdatedimageDto.parent !== undefined && toBeUpdatedimageDto.parent.id !== undefined) {
    //         var parentimage = await this.getImage(toBeUpdatedimageDto.parent.id);
    //         image.parent = toBeUpdatedimageDto.parent;
    //         image.imagePath = parentimage.imagePath + "/" + image.id;
    //     }

    //     var result = await this.imageRepository.save(image);
    //     if (result) {
    //         this.ioService.checkAndMoveimage(tempPathForMoveProcess, image.imagePath,)
    //     }
    //     return result;
    // }

    async deleteimage(imageId: string) {
        return await this.imageRepository.softDelete(imageId);
    }
}


