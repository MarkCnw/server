import { Static, t, TSchema } from "elysia"

export const _pagination = t.Object({
    pagesize: t.Number(),
    currentPage: t.Number(),
    length: t.Optional(t.Number()),
})
export type Pagination = Static<typeof _pagination>

export function CreatePagination<T extends TSchema, U extends TSchema>(itemType: T, paginationType: U) {
    return t.Object({
        items: t.Array(itemType),
        pagination: paginationType
    })
}