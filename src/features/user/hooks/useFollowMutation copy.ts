import { useMutation } from '@apollo/client'

import { FOLLOW_MUTATION, USER_QUERY } from 'graphqlClient/queries/userQuery'

export const useFollowMutation = () =>
    useMutation<
        { follow: string },
        {
            followingId: string
        }
    >(FOLLOW_MUTATION, { refetchQueries: [USER_QUERY, 'User'] })
