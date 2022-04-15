import { ImageEntity } from "./image.entity";

export class CreateImageDto {
    imageName: string;
    parent: ImageEntity;
}
