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
            return 'w-10 h-10'
        case 'lg':
            return 'w-12 h-12'
        case 'sm':
            return 'w-8 h-8'
    }
}

export default memo(function Avatar({
    url = 'https://i.pravatar.cc/40',
    size = 'base',
}: AvatarProps) {
    return (
        <img
            className={clsx('rounded-lg', getClassFromSize(size))}
            src={url}
            onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = 'https://i.pravatar.cc/40'
            }}
        />
    )
})
