import { fileTypeFromBlob, fileTypeFromBuffer } from "file-type"

const acceptFiletImageTypes = ['image/jpeg', 'image/png']


export const ImageHelper = {
    isImage: async function (fileArrayBuffer: ArrayBuffer): Promise<boolean> {
        //const buffer = await file.arrayBuffer()
        const fileTypeResult = await fileTypeFromBuffer(fileArrayBuffer)
        if (fileTypeResult == undefined)
            return false
        return acceptFiletImageTypes.includes(fileTypeResult.mime)
    }
}