import clsx from 'clsx'
import { memo } from 'react'

type AvatarSize = 'lg' | 'sm' | 'base'

interface AvatarProps {
    url?: string
    size?: AvatarSize
}

const getClassFromSize = (s: AvatarSize) => {
    switch (s) {
        case 'base':
            return 'w-8 h-8 md:w-10 md:h-10'
        case 'lg':
            return 'w-10 h-10 md:w-12 md:h-12'
        case 'sm':
            return 'w-4 h-4 md:w-6 md:h-6'
    }
}

export default memo(function Avatar({ url, size = 'base' }: AvatarProps) {
    return (
        <img
            className={clsx('rounded-lg', getClassFromSize(size))}
            src={url ?? 'https://i.pravatar.cc/40'}
            onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = 'https://i.pravatar.cc/40'
            }}
        />
    )
})
