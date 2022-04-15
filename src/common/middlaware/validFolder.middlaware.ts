import { Injectable, NestMiddleware, HttpException } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"


@Injectable()
export class ValidFolderMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.params.studenId === "test") {
            throw new HttpException("test", 400)
        }
        next()
    }
}