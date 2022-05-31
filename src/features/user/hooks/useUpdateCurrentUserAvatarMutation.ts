import { useMutation } from '@apollo/client'

import {
    GET_USER_QUERY,
    UPDATE_CURRENT_USER_AVATAR_MUTATION,
} from 'graphqlClient/queries/userQuery'

export const useUpdateCurrentUserAvatarMutation = () =>
    useMutation<User, { avatarId: string }>(
        UPDATE_CURRENT_USER_AVATAR_MUTATION,
        { refetchQueries: [GET_USER_QUERY, 'GetUser'] },
    )
