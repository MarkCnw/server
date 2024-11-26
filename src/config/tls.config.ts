import { file } from "bun"

let _tls = {}
const mode = Bun.env.MODE || 'production'

if (mode !== 'production') {
    const cert = file("../ssl/loaclhost.pem")
    const key = file("../ssl/loaclhost-key.pem")
    _tls = { cert, key }
}
export const tlsConfig = { ..._tls }