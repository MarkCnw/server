import Elysia from "elysia"

import { UserService } from "../services/user.service"

import { Accountservices } from "../services/account.service"
import { UserDto } from "../../types/user.type"
import { AuthMiddleware, AuthPayload } from "../middleware/auth.middleware"

export const UserController = new Elysia({
    prefix: "/api/user",
    tags: ['User']
})
    .use(UserDto)
    .use(AuthMiddleware)
    .get('/all', () => {
        return {
            user: [
                { id: '12', name: 's' },
                { id: '14', name: 't' }
            ]
        }
    })
    .get('/', ({ query, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        return UserService.get(query, user_id)
    }, {
        detail: { summary: "Get User" },
        query: "pagination",
        response: "users",
        isSignIn: true,
    })

    .patch('/', async ({ body, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await UserService.updateProfile(body, user_id)
            set.status = "No Content"
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