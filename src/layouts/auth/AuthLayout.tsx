import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useCurrentUserQuery } from 'features/user/hooks/useCurrentUserQuery'

export default function AuthLayout() {
    const { data } = useCurrentUserQuery()
    const navigate = useNavigate()

    useEffect(() => {
        if (data) {
            navigate('/')
        }
    }, [data])

    return (
        <div className="bg-white dark:bg-neutral-800 min-h-screen grid place-items-center p-5">
            <Outlet />
        </div>
    )
}
