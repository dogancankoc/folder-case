import { move } from 'fs-extra';
import { access, mkdir } from 'fs';
import { HttpException } from '@nestjs/common';
const sharp = require('sharp');

export class IOHelper {
    async checkAndCreateNewFolder(path) {
        var folderName = process.env.BASE_DOCUMENT_PATH + '/' + path;

        access(folderName, (error) => {
            if (error) {
                mkdir(folderName, { recursive: true }, (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('New Directory created successfully !!');
                    }
                });
            } else {
                console.log('Given Directory already exists !!');
                throw new HttpException('folder already exists!', 400);
            }
        });
    }

    async checkAndMoveFolder(oldPath, newPath) {
        var oldFolderName = process.env.BASE_DOCUMENT_PATH + '/' + oldPath;
        var newFolderName = process.env.BASE_DOCUMENT_PATH + '/' + newPath;

        move(oldFolderName, newFolderName, { recursive: true, force: true }, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Directory moved successfully !!');
            }
        });
    }

    async writeImage(file, path) {
        var imagePath = process.env.BASE_DOCUMENT_PATH + '/' + path;
        const sharpFile = sharp(file.buffer);
        const stats = await sharpFile.stats();
        const metadata = await sharpFile.metadata();
        delete metadata.icc;
        const fullStats = JSON.stringify({ stats, metadata });
        await sharpFile.toFile(imagePath);
        return fullStats;
    }

    async rotateImageAndWrite(path, version) {
        const imagePath = process.env.BASE_DOCUMENT_PATH + '/' + path;
        const sharpFile = sharp(imagePath);
        const fileNameSplited = path.split('.');
        const fileExtension = fileNameSplited.pop();
        const originalFileName = process.env.BASE_DOCUMENT_PATH + '/' + fileNameSplited.join('.');
        const rotatedImage = await sharpFile.rotate(90);
        const willBeUpdatedPath = originalFileName + version + '.' + fileExtension;
        await rotatedImage.toFile(willBeUpdatedPath);
        const stats = await rotatedImage.stats();
        const metadata = await rotatedImage.metadata();
        delete metadata.icc;
        const updatedPathForObject = await this.willBeUpdatedFilePath(path, version);
        const fullStats = JSON.stringify({ stats, metadata });

        return { fullStats, updatedPathForObject };
    }

    async willBeCreatedFileName(willBeConvertedName, fileSize) {
        const fileNameSplited = willBeConvertedName.split('.');
        const fileExtension = fileNameSplited.pop();
        const originalFileName = fileNameSplited.join('.');
        return (await originalFileName) + '_' + fileSize.toString() + '.' + fileExtension;
    }

    async willBeUpdatedFilePath(willBeConvertedPath, version) {
        const fileNameSplited = willBeConvertedPath.split('.');
        const fileExtension = fileNameSplited.pop();
        const updatedFilePath = fileNameSplited.join('.');
        return (await updatedFilePath) + version + '.' + fileExtension;
    }

    async willBeUpdatedFileName(willBeConvertedName, version) {
        const fileNameSplited = willBeConvertedName.split('.');
        const fileExtension = fileNameSplited.pop();
        const updatedFileName = fileNameSplited.join('.');
        return (await updatedFileName) + version + '.' + fileExtension;
    }
}
