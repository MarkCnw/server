import Elysia from "elysia"


export const UserController = new Elysia({
    prefix: "/api/users",
    tags: ['user']
})
    .get('/all', () => {
        return {
            text: "hello world "
        }
    }, {
        isSignim: true,
    })