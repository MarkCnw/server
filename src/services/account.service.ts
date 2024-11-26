import { login, register } from "../../types/account.type"
import { user } from "../../types/user.type"
import { User } from "../models/user.model"

export const AccountService = {
    login: async function (loginData: login): Promise<user> {
        // Find the user by username
        const user = await User.findOne({ username: loginData.username }).exec()
        if (!user) {
            throw new Error("User does not exist")
        }
        // Verify the password
        const verifyPassword = await user.verifyPassword(loginData.password)
        if (!verifyPassword) {
            throw new Error("Password is incorrect")
        }

        // Return the user if successful
        return user.toUser()
    },

    createNewUser: async function (registerData: register): Promise<user> {
        // Check if the username already exists
        const user = await User.findOne({ username: registerData.username }).exec()
        if (user) {
            throw new Error(`${registerData.username} already exists`)
        }
        // Create a new user
        const newUser = await User.createUser(registerData)
        return newUser.toUser()
    }
}
