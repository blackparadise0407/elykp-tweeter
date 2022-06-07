import { useMutation } from '@apollo/client'

import { UNFOLLOW_MUTATION, USER_QUERY } from 'graphqlClient/queries/userQuery'

export const useUnfollowMutation = () =>
    useMutation<
        { unfollow: string },
        {
            unfollowingId: string
        }
    >(UNFOLLOW_MUTATION, { refetchQueries: [USER_QUERY, 'User'] })
