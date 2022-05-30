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
            profile {
                fullName
                description
                coverPhotoId
            }
        }
    }
`

export const GET_USER_QUERY = gql`
    query GetUser($username: String!) {
        getUser(username: $username) {
            id
            username
            email
            profileId
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
