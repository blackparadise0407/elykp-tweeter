import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useGetUserLazyQuery } from './useGetUserLazyQuery'

export const useGetUserFromUrl = () => {
    const { username } = useParams<{ username: string }>()
    const [getUserLazyQuery, result] = useGetUserLazyQuery()

    useEffect(() => {
        getUserLazyQuery({ variables: { username } })
    }, [username])

    return result
}
