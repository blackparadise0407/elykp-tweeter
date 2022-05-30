import { useLazyQuery } from '@apollo/client'

import { GET_USER_QUERY } from 'graphqlClient/queries/userQuery'

export const useGetUserLazyQuery = () =>
    useLazyQuery<{ getUser: User }, { username?: string }>(GET_USER_QUERY)
