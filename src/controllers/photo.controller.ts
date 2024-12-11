import Elysia, { t } from "elysia"
import { ImageHelper } from "../helpers/image.helperts"
import { error } from "console"
import { PhotoDto } from "../../types/photo.type"
import { AuthMiddleware, AuthPayload } from "../middleware/auth.middleware"
import { PhotoService } from "../services/photo.service"

const _imageDB: { id: string, data: string, type: string }[] = []

export const photocontroller = new Elysia({
    prefix: "api/photo",
    tags: ['photo']
})
    .use(AuthMiddleware)
    .use(PhotoDto)

    .post('/', async ({ body: { file }, set, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        try {
            return await PhotoService.upload(file, user_id)

        } catch (error) {
            set.status = 404
            if (error instanceof Error)
                throw error
            throw new Error("something went wrong,try again later!!")
        }
    }, {
        detail: { summary: "Upload photo" },
        body: "upload",
        response: "photo",
        isSignIn: false
    })

