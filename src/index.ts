import { Elysia, t } from "elysia"
import { example } from "./controllers/example.controllers"
import { swaggerConfig } from "./config/swagger.config"
import { tlsConfig } from "./config/tls.config"
import cors from "@elysiajs/cors"
import { MongoDB } from "./config/database.config"
import { jwtConfig } from "./config/jwt.config"
import { AccountController } from "./controllers/accounts.controller"
import { UserController } from "./controllers/user.controller"
import staticPlugin from "@elysiajs/static"
import { photocontroller } from "./controllers/photo.controller"
import { LikeController } from "./controllers/like.controller"

MongoDB.connect()
const app = new Elysia()
  .use(cors())
  .use(jwtConfig)
  .use(swaggerConfig)
  .use(example)
  .use(AccountController)
  .use(UserController)
  .use(photocontroller)
  .use(LikeController)
  .use(staticPlugin({
    assets: "public/uploads",
    prefix: "img"
  }))

  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfig
  })

let protocol = 'http'
if ('cert' in tlsConfig)
  protocol = 'https'
console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)