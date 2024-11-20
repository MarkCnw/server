import mongoose, { Mongoose } from "mongoose"
import { register, user } from "../../tyoes/account.type"
import { promises } from "dns"

type userWithOutID = Omit<user, 'id'>

export interface IUserDocument extends mongoose.Document, userWithOutID {
    password_hash: string
    Verifypassword: (password: string) => Promise<boolean>
    toUser: () => user
}
export interface IUserModel extends mongoose.Model<IUserDocument> {
    createUser: (registerData: register) => Promise<IUserDocument>
}