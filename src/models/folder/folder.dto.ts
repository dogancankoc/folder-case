import { FolderEntity } from "./folder.entity";

export class CreateFolderDto {
    folderName: string;
    parent: FolderEntity;
}

export class UpdateFolderDto {
    folderName: string;
    parent: FolderEntity;
}