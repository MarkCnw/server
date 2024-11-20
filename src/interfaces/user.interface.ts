import mongoose from "mongoose"
import { register, user } from "../../types/account.type"

type userWithoutID = Omit<user, "id">

export interface IUserDocument extends mongoose.Document, userWithoutID {
    password_hash: string

    verifyPassword: (password: string) => Promise<boolean>
    toUser: () => user
}
export interface IUsermodel extends mongoose.Model<IUserDocument> {
    createUser: (registerData: register) => Promise<IUserDocument>
}
