import mongoose from "mongoose"
import { register } from "../../types/account.type"
import { user } from "../../types/user.type"


type userWithoutID = Omit<user, "id">

export interface IUserDocument extends mongoose.Document, userWithoutID {
    password_hash: string

    verifyPassword: (password: string) => Promise<boolean>
    toUser: () => user
}
export interface IUserModel extends mongoose.Model<IUserDocument> {
    createUser: (registerData: register) => Promise<IUserDocument>
}
