import { useMutation } from '@apollo/client'

import {
    USER_QUERY,
    UPDATE_CURRENT_USER_PROFILE_MUTATION,
} from 'graphqlClient/queries/userQuery'

export const useUpdateCurrentUserProfileMutation = () =>
    useMutation<
        any,
        {
            updateCurrentUserProfileInput: {
                description?: string
                coverPhotoId?: string
                fullName?: string
            }
        }
    >(UPDATE_CURRENT_USER_PROFILE_MUTATION, {
        refetchQueries: [USER_QUERY, 'User'],
    })
