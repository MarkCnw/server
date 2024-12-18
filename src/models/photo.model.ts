import mongoose from "mongoose"
import { IPhotoDocument, IPhotomodel } from "../interfaces/photo.interface"
import { _photo, photo } from "../../types/photo.type"


const schema = new mongoose.Schema<IPhotoDocument, IPhotomodel>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    public_id: { type: String, required: true },
    url: { type: String, required: true },
    is_avatar: { type: Boolean, required: true, default: false },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

schema.methods.toPhoto = function (): photo {
    return {
        id: this._id.toString(),
        url: this.url,
        public_id: this.public_id,
        is_avatar: this.is_avatar,
        created_at: this.created_at,
    }
}

schema.statics.setAvatar = async function (photo_id: string, user_id: string): Promise<boolean> {
    await this.updateMany(
        { user: new mongoose.Types.ObjectId(user_id) },
        { $set: { is_avatar: false } }
    )
    const updatedPhoto = await this.findByIdAndUpdate(
        photo_id, { $set: { is_avatar: true } }
    )
    return !!updatedPhoto
}

export const Photo = mongoose.model<IPhotoDocument, IPhotomodel>('Photo', schema)