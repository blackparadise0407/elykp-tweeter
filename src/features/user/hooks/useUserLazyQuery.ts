import { useLazyQuery } from '@apollo/client'

import { USER_QUERY } from 'graphqlClient/queries/userQuery'

export const useUserLazyQuery = () =>
    useLazyQuery<{ user: User }, { username?: string }>(USER_QUERY)
