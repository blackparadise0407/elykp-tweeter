import React, {
    memo,
    useState,
    useRef,
    ReactNode,
    useCallback,
    MouseEventHandler,
} from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineRotateLeft, AiOutlineRotateRight } from 'react-icons/ai'
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from 'react-image-crop'

import { Modal } from 'components'
import { useToast } from 'contexts/toast'
import { isUnderLimitSize, isValidMimeType } from 'helpers/file'
import { useDebounceEffect } from 'hooks/useDebounceEffect'

import { canvasPreview } from './canvasPreview'
import 'react-image-crop/dist/ReactCrop.css'
import { blobToFile, toBlob } from './imagePreview'

interface ImageCropperProps {
    aspect?: number
    children: ReactNode
    loading?: boolean
    sizeLimit?: number
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
    children,
    loading = false,
    sizeLimit, // 3 Mb
    onConfirm = () => {},
}: ImageCropperProps) {
    const { t } = useTranslation()
    const { enqueue } = useToast()
    const [imgSrc, setImgSrc] = useState('')
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [rotate, setRotate] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.length) {
            const file = e.target.files[0]
            if (!isValidMimeType(file)) {
                enqueue(t('validation.file_type_not_supported'), {
                    variant: 'warning',
                })
                return
            }
            if (
                typeof sizeLimit !== 'undefined' &&
                !isUnderLimitSize(file, sizeLimit)
            ) {
                enqueue(
                    t('validation.uploaded_file_must_be_under_size', {
                        size: sizeLimit / 1000000,
                    }),
                    {
                        variant: 'warning',
                    },
                )
                return
            }
            setCrop(undefined)
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

    const handleOpenCopper = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleCloseCropper = useCallback(() => {
        setImgSrc('')
        setCrop(undefined)
    }, [])

    const handleConfirm = async () => {
        if (previewCanvasRef.current) {
            const blob = await toBlob(previewCanvasRef.current)
            const file = blobToFile(blob, Date.now().toString())
            onConfirm(file)
            handleCloseCropper()
        }
    }

    const handleInputClick: MouseEventHandler<HTMLInputElement> = (e) => {
        const element = e.target as HTMLInputElement
        element.value = ''
    }

    return (
        <div className="select-none">
            <div onClick={handleOpenCopper}>{children}</div>
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onSelectFile}
                onClick={handleInputClick}
            />
            <Modal
                title={t('select_image')}
                open={!!imgSrc}
                onClose={handleCloseCropper}
                onOk={handleConfirm}
                cancelBtnProps={{
                    loading,
                }}
                okBtnProps={{
                    loading,
                }}
            >
                <div className="flex flex-col items-center gap-2 p-2">
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
                    </div>
                </div>
            </Modal>
        </div>
    )
})
