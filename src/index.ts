import { Elysia, t } from "elysia"

import { cors } from '@elysiajs/cors'

import { UserController } from "./controllers/user.controller"
import staticPlugin from "@elysiajs/static"
import { PhotoController } from "./controllers/photo.controller"
import { MongoDB } from "./config/database.config"
import { jwtConfig } from "./config/jwt.config"
import { swaggerConfig } from "./config/swagger.config"
import { tlsConfig } from "./config/tls.config"
import { AccountController } from "./controllers/accounts.controller"
import { ErrorController } from "./controllers/error.Controller"
import { LikeController } from "./controllers/like.controller"
import { MessageController } from "./controllers/message.controller"

MongoDB.connect()
const app = new Elysia()
  .use(ErrorController)
  .use(cors())
  .use(AccountController)
  .use(jwtConfig)
  .use(swaggerConfig)
  .use(LikeController)
  .use(MessageController)
  // .use(Example)
  .use(UserController)
  .use(staticPlugin({
    assets: "public/uploads",
    prefix: "img"
  }))
  .use(PhotoController)
  //   .listen({
  //     port: Bun.env.PORT || 8000,
  //     tls: tlsConfig
  //   })

  // console.log(
  //   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  // )
  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfig
  })

let protocol = 'http'
if ('cert' in tlsConfig)
  protocol = 'https'
console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)