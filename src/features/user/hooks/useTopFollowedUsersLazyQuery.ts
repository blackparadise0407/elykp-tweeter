import { useLazyQuery } from '@apollo/client'

import { TOP_FOLLOWED_USERS_QUERY } from 'graphqlClient/queries/userQuery'

export const useTopFollowedUsersLazyQuery = () =>
    useLazyQuery<{ topFollowedUsers: TopFollowedUser[] }, { userId?: string }>(
        TOP_FOLLOWED_USERS_QUERY,
    )
