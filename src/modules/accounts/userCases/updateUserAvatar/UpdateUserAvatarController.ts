import { request, Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";


class UpdateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        if (request.file) {
            const avatar_file = request.file.filename;

            const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

            await updateUserAvatarUseCase.execute({ user_id: id, avatar_file })

            return response.status(204).send();
        }
        return response.status(400).send();
    }
}

export { UpdateUserAvatarController }