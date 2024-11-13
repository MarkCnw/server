import { Elysia, t } from "elysia"

export const example = new Elysia()

    .get("/", () => "Hello World", {
        detail: {
            tags: ["example"],
            summary: "Yamada",
            description: "bla bro"
        }
    })
    .post("/about", ({ body }) => {
        return {
            id: 'xxx',
            msg: 'hello' + body.name
        }
    }
        , {
            body: t.Object({
                name: t.String()
            }),
            detail: {
                tags: ["example"],
                summary: "Yamada",
                description: "bla bro"
            }
        })
