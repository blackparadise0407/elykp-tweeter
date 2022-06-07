import { gql } from '@apollo/client'

export const CURRENT_USER_QUERY = gql`
    query CurrentUser {
        currentUser {
            id
            username
            email
            verified
            enabled
            profileId
            avatarId
            profile {
                fullName
                description
                coverPhotoId
            }
        }
    }
`

export const USER_QUERY = gql`
    query UserQuery($username: String!) {
        user(username: $username) {
            id
            username
            email
            profileId
            avatarId
            profile {
                fullName
                description
                coverPhotoId
            }
        }
    }
`

export const UPDATE_CURRENT_USER_PROFILE_MUTATION = gql`
    mutation UpdateCurrentUserProfileMutation(
        $updateCurrentUserProfileInput: UpdateCurrentUserProfileInput!
    ) {
        updateCurrentUserProfile(
            updateCurrentUserProfileInput: $updateCurrentUserProfileInput
        ) {
            id
        }
    }
`

export const UPDATE_CURRENT_USER_AVATAR_MUTATION = gql`
    mutation UpdateCurrentUserAvatar($avatarId: String!) {
        updateCurrentUserAvatar(avatarId: $avatarId) {
            id
        }
    }
`
