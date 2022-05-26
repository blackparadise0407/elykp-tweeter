declare global {
    interface User {
        id: string
        email: string
        username: string
        verified: boolean
        enabled: boolean
    }
}

export {}
