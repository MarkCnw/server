import { file } from "bun"

let _tls = {}
const mode = Bun.env.MODE || 'production'

if (mode !== 'production') {
    const cert = file("../ssl/localhost.pem")
    const key = file("../ssl/localhost.pem")
    _tls = { cert, key }
}
export const tlsConfig = { ..._tls }