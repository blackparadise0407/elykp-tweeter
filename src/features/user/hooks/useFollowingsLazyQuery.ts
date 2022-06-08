import { useLazyQuery } from '@apollo/client'

import { FOLLOWINGS_QUERY } from 'graphqlClient/queries/userQuery'

export const useFollowingsLazyQuery = () =>
    useLazyQuery<{ followings: Relationship[] }, { userId: string }>(
        FOLLOWINGS_QUERY,
    )
