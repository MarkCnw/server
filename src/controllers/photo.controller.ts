import Elysia, { t } from "elysia"

export const photocontroller = new Elysia({
    prefix: "api/photo",
    tags: ['photo']
})
    .post('/', async ({ body: { imgFile } }) => {
        const fileename = `${Date.now()}-${imgFile.name}`
        const filePath = `public/uploads/${fileename}`
        const buffer = await imgFile.arrayBuffer()
        await Bun.write(filePath, buffer)

        return `https://localhost:8000/img/${fileename}`
    }, {
        detail: { summary: "Upload photo" },
        body: t.Object({
            imgFile: t.File()
        })
    })
