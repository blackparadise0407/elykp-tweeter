import { useMutation } from '@apollo/client'

import {
    GET_USER_QUERY,
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
        refetchQueries: [GET_USER_QUERY, 'GetUser'],
    })
