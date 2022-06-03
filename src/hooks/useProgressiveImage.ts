import { useEffect, useState } from 'react'

import { IMAGE_PLACEHOLDER } from 'assets/images'

export const useProgressiveImage = (
    src?: string,
    placeholder: string = IMAGE_PLACEHOLDER,
) => {
    const [sourceLoaded, setSourceLoaded] = useState(placeholder)
    useEffect(() => {
        if (src) {
            const img = new Image()
            img.src = src
            img.onload = () => setSourceLoaded(src)
        }
    }, [src])

    return sourceLoaded
}
