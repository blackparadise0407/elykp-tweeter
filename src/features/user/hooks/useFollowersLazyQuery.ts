import { useLazyQuery } from '@apollo/client'

import { FOLLOWERS_QUERY } from 'graphqlClient/queries/userQuery'

export const useFollowersLazyQuery = () =>
    useLazyQuery<{ followers: any[] }, { userId: string }>(FOLLOWERS_QUERY)
