import Elysia from "elysia"
import { UserDto } from "../../types/user.type"
import { UserService } from "../services/user.service"
import { AuthMiddleware, AuthPayload } from "../middleware/auth.middleware"


export const UserController = new Elysia({
    prefix: "/api/user",
    tags: ['user']
})

    .use(UserDto)
    .use(AuthMiddleware)
    .get('/all', () => {
        return {
            text: "hello world "
        }
    }, {
        isSignIn: true
    })

    .get('/', ({ query, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        return UserService.get(query, user_id)
    }, {
        detail: { summary: "get user" },
        query: "pagination",
        response: "users",
        isSignIn: true,
    })

    .patch('/', async ({ body, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            return await UserService.updateProfile(body, user_id)
            set.status = 404
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw new Error(error.message)
            set.status = 500
            throw new Error('Somthing went wrong, Try again later')
        }
    }, {
        detail: { summary: "Update Profile" },
        body: "updateProfile",
        //response: "user",
        isSignIn: true
    })