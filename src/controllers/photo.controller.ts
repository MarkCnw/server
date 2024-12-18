import Elysia, { t } from "elysia"
import { ImageHelper } from "../helpers/image.helperts"
import { error } from "console"
import { PhotoDto } from "../../types/photo.type"
import { AuthMiddleware, AuthPayload } from "../middleware/auth.middleware"
import { PhotoService } from "../services/photo.service"
import { Photo } from "../models/photo.model"
import { file } from "bun"

// const _imageDB: { id: string, data: string, type: string }[] = []

export const photocontroller = new Elysia({
    prefix: "api/photo",
    tags: ['photo']
})
    .use(AuthMiddleware)
    .use(PhotoDto)
    .patch('/:photo_id', async ({ params: { photo_id }, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await PhotoService.setAvatar(photo_id, user_id)
            set.status = "No Content"
        }
        catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw error
            throw new Error("Something went wrong ,try again later !!")
        }
    }, {
        detail: { summary: "Set avatar" },
        isSignIn: true,
        params: "photo_id"
    })
    .delete('/:photo_id', async ({ params: { photo_id }, set }) => {
        try {
            await PhotoService.delete(photo_id)
            set.status = 204
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw error
            throw new Error("something went wrong,try again later!!"
            )
        }
    }, {
        detail: { summary: "delete photo by photo_id" },
        isSignIn: true,
        params: "photo_id"
    })
    .get('/', async ({ Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        return await PhotoService.getPhotos(user_id)
    }, {
        detail: { summary: "gets photo[]by user_id" },
        isSignIn: true,
        response: "photos"
    })

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
        isSignIn: true
    })

