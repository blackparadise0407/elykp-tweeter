import { PixelCrop } from 'react-image-crop'

import { canvasPreview } from './canvasPreview'

let previewUrl = ''

export function toBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve) => {
        canvas.toBlob(resolve as BlobCallback)
    })
}

export async function imgPreview(
    image: HTMLImageElement,
    crop: PixelCrop,
    scale = 1,
    rotate = 0,
) {
    const canvas = document.createElement('canvas')
    canvasPreview(image, canvas, crop, scale, rotate)

    const blob = await toBlob(canvas)
    if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
    }

    previewUrl = URL.createObjectURL(blob)
    return previewUrl
}

export const blobToFile = (blob: Blob, name: string): File => {
    return new File([blob], name)
}
