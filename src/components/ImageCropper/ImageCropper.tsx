import React, { memo, useState, useRef } from 'react'
import {
    AiOutlineCheck,
    AiOutlineClose,
    AiOutlineRotateLeft,
    AiOutlineRotateRight,
} from 'react-icons/ai'
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from 'react-image-crop'

import { useDebounceEffect } from 'hooks/useDebounceEffect'

import { canvasPreview } from './canvasPreview'
import 'react-image-crop/dist/ReactCrop.css'
import { blobToFile, toBlob } from './imagePreview'

interface ImageCropperProps {
    aspect?: number
    onConfirm?: (file: File) => void
}

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export default memo(function ImageCropper({
    aspect = 1 / 1,
    onConfirm = () => {},
}: ImageCropperProps) {
    const [imgSrc, setImgSrc] = useState('')
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [rotate, setRotate] = useState(0)

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader?.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget
        setCrop(centerAspectCrop(width, height, aspect))
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    1,
                    rotate,
                )
            }
        },
        100,
        [completedCrop, rotate],
    )

    const handleRotate = (left = false) => {
        setRotate((rotate) => (left ? (rotate -= 90) : (rotate += 90)))
    }

    const handleConfirm = async () => {
        if (previewCanvasRef.current) {
            const blob = await toBlob(previewCanvasRef.current)
            const file = blobToFile(blob, Date.now().toString())
            onConfirm(file)
        }
    }

    return (
        <div className="select-none">
            <input type="file" accept="image/*" onChange={onSelectFile} />
            {imgSrc && (
                <div>
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                    >
                        <img
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            style={{
                                transform: `rotate(${rotate}deg)`,
                            }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                    <canvas ref={previewCanvasRef} className="hidden"></canvas>

                    <div className="flex items-center justify-center gap-2 text-xl">
                        <div className="p-1 rounded-md shadow bg-white hover:text-blue-500 transition-colors">
                            <AiOutlineRotateLeft
                                className="cursor-pointer"
                                onClick={() => handleRotate(true)}
                            />
                        </div>
                        <div className="p-1 rounded-md shadow bg-white hover:text-blue-500 transition-colors">
                            <AiOutlineRotateRight
                                className="cursor-pointer"
                                onClick={() => handleRotate()}
                            />
                        </div>
                        <div className="p-1 rounded-md shadow bg-white text-red-500 hover:text-red-400 transition-colors">
                            <AiOutlineClose className="cursor-pointer" />
                        </div>
                        <div className="p-1 rounded-md shadow bg-white text-green-500 hover:text-green-400 transition-colors">
                            <AiOutlineCheck
                                className="cursor-pointer"
                                onClick={handleConfirm}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
})
