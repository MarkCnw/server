import jwt from "@elysiajs/jwt"

export const jwtConfig = jwt({
    name: 'jwt',
    secret: Bun.env.JWT_SECRET || 'markyamada',
    exp: '1d'
})