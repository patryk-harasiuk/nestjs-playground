import { HttpException, HttpStatus } from "@nestjs/common";

export class PostNotFound extends HttpException {
    constructor(postId: number) {
        super(`Post with id ${postId} not found`, HttpStatus.NOT_FOUND);
    }
}