import { useQuery } from '@apollo/client'

import { TOP_FOLLOWED_USERS_QUERY } from 'graphqlClient/queries/userQuery'

export const useTopFollowedUsersQuery = () =>
    useQuery<{ topFollowedUsers: TopFollowedUser[] }>(TOP_FOLLOWED_USERS_QUERY)
