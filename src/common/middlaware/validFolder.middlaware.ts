import { Injectable, NestMiddleware, HttpException } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"


@Injectable()
export class ValidFolderMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.params.folderId === "test") {
            throw new HttpException("Test objesi kabul edilemez", 400)
        }
        next()
    }
}