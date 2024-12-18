import mongoose from "mongoose"
import { photo } from "../../types/photo.type"
import { Cloudinary } from "../config/cloudinary.config"
import { ImageHelper } from "../helpers/image.helperts"
import { Photo } from "../models/photo.model"
import { User } from "../models/user.model"

export const PhotoService = {
    upload: async function (file: File, user_id: string): Promise<photo> {
        const buffer = await file.arrayBuffer()
        const isFileValid = ImageHelper.isImage(buffer)
        if (!isFileValid)
            throw new Error("Image must be .jpg or .png")
        const base64 = Buffer.from(buffer).toString('base64')
        const dataURL = `data:${file.type};base64,${base64}`
        const cloundPhoto = await Cloudinary.uploader.upload(dataURL, {
            folder: 'class-example-user-image',
            resource_type: "auto",
            transformation: [{
                width: 500,
                height: 500,
                crop: 'fill',
                gravity: 'face'
            }]
        })
        if (!cloundPhoto.public_id || !cloundPhoto.secure_url)
            throw new Error("Something went wrong")
        const uploadPhoto = new Photo({
            user: new mongoose.Types.ObjectId(user_id),
            url: cloundPhoto.secure_url,
            public_id: cloundPhoto.public_id
        })
        await uploadPhoto.save()
        await User.findByIdAndUpdate(
            user_id,
            { $push: { photos: uploadPhoto._id } }
        )
        return uploadPhoto.toPhoto()
    },
    getPhotos: async function (user_id: string): Promise<photo[]> {
        const photoDocs = await Photo.find({ user: user_id }).exec()
        const photos = photoDocs.map(doc => doc.toPhoto())
        return photos
    },
    delete: async function (photo_id: string): Promise<boolean> {
        const doc = await Photo.findById(photo_id).exec()
        if (!doc)
            throw new Error(`photo ${photo_id} not existing`)

        await User.findByIdAndDelete(doc.user, {
            $pull: { photos: photo_id }
        })

        await Photo.findByIdAndDelete(photo_id)

        await Cloudinary.uploader.destroy(doc.public_id)

        return true
    },
    setAvatar: async function (photo_id: string, user_id: string): Promise<boolean> {
        await Photo.updateMany(
            { user: new mongoose.Types.ObjectId(user_id) },
            { $set: { is_avatar: false } }
        )
        const result = await Photo.findByIdAndUpdate(photo_id,
            { $set: { is_avatar: true } },
            { new: true }
        )
        return !!result

    }

}