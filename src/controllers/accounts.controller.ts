import Elysia from "elysia"
import { jwtConfig } from "../config/jwt.config"
import { _userAndToken, AccountDto } from "../../types/account.type"
import { AccountService } from "../services/account.service"


export const AccountController = new Elysia({
    prefix: '/api/account',
    tags: ['Account']
})
    .use(jwtConfig)
    .use(AccountDto)
    .post('/login', async ({ body, jwt, set }) => {
        try {
            const user = await AccountService.login(body)
            const token = await jwt.sign({ id: user.id })
            return { token, user }
        } catch (error) {
            set.status = 500
            if (error instanceof Error)
                throw new Error(error.message)
            set.status = 500
            throw new Error('something went wrong,try again later')
        }
    }, {
        detail: { summary: "Login" },
        body: "login",
        response: _userAndToken,
    })
    .post('/register', async ({ body, jwt, set }) => {
        try {
            const user = await AccountService.createNewUser(body)
            const token = await jwt.sign({ id: user.id })
            return { token, user }
        } catch (error) {
            set.status = 500
            if (error instanceof Error)
                throw new Error(error.message)
            set.status = 500
            throw new Error('something went wrong,try again later')
        }
    }, {
        body: "register",
        response: _userAndToken,
        detail: {
            summary: "create a new user"
        },
        beforeHandle: ({ body: { username, password }, set }) => {
            const usernameRegex = /^[A-Za-z][A-Za-z\d]{3,9}$/
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/
            if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
                set.status = "Bad Request"
                throw new Error(`Invalid username or password`)
            }
        },

    })
