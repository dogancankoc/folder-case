import { FolderEntity } from "./folder.entity";

export class CreateFolderDto {
    folderName: string;
    parent: FolderEntity;
    createdAt: string;
}

export class UpdateFolderDto {
    folderName: string;
    parent: FolderEntity;
}