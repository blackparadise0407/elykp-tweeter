declare global {
    interface User {
        id: string
        email: string
        username: string
        verified: boolean
        enabled: boolean
    }

    interface Tweet {
        id: number
        text: string
        user: User
        createdAt: Date
        updatedAt: date
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
}

export {}
