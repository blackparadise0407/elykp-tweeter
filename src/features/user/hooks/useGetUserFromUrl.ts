import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useUserLazyQuery } from './useUserLazyQuery'

export const useGetUserFromUrl = () => {
    const { username } = useParams<{ username: string }>()
    const [getUserLazyQuery, result] = useUserLazyQuery()

    useEffect(() => {
        getUserLazyQuery({ variables: { username } })
    }, [username])

    return result
}
