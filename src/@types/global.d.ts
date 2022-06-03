import { ReactNode } from 'react'

declare global {
    interface User {
        id: string
        email: string
        username: string
        verified: boolean
        enabled: boolean
        profile: Profile
        profileId: number
        avatarId?: string
        avatar?: Attachment
    }

    interface Profile {
        id: number
        fullName: string
        description: string
        coverPhoto?: Attachment
        coverPhotoId?: string
    }

    interface Tweet {
        id: number
        text: string
        user: User
        photo: Attachment
        photoId: string
        tags: Tag[]
        createdAt: Date
        updatedAt: date
    }

    interface Tag {
        id: number
        name: string
    }

    interface Cursor {
        afterCursor: string | null
        beforeCursor: string | null
    }

    interface Attachment {
        id: string
        path: string
        mimetype: string
        encoding: string
    }

    type ToastVariant = 'success' | 'warning' | 'error' | 'info'

    interface ToastOptions {
        variant?: ToastVariant
    }

    interface Toast {
        id: number
        message: ReactNode
        variant: ToastVariant
    }

    interface ToastContext {
        items: Toast[]
        enqueue: (message?: string, opts?: ToastOptions) => void
        remove: (id: number) => void
    }
}

export {}
