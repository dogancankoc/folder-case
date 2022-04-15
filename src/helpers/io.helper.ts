import { HttpException } from "@nestjs/common";

export class IOHelper {
    async checkAndCreateNewFolder(path) {
        const fs = require('fs');
        var folderName = process.env.BASE_DOCUMENT_PATH + "/" + path;

        fs.access(folderName, (error) => {
            if (error) {
                fs.mkdir(folderName, { recursive: true }, (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("New Directory created successfully !!");
                    }
                });
            } else {
                console.log("Given Directory already exists !!");
                throw new HttpException('folder already exists!', 400)
            }
        });
    }

    async checkAndMoveFolder(oldPath, newPath) {
        var fs = require('fs-extra')
        var oldFolderName = process.env.BASE_DOCUMENT_PATH + "/" + oldPath;
        var newFolderName = process.env.BASE_DOCUMENT_PATH + "/" + newPath;

        fs.move(oldFolderName, newFolderName, { recursive: true, force: true }, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Directory moved successfully !!");
            }
        });
    }
}