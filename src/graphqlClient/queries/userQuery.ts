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
                id
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
                id
                fullName
                description
                coverPhotoId
            }
            followingCount
            followerCount
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

export const FOLLOW_MUTATION = gql`
    mutation FollowMutation($followingId: String!) {
        follow(followingId: $followingId)
    }
`

export const UNFOLLOW_MUTATION = gql`
    mutation UnfollowMutation($unfollowingId: String!) {
        unfollow(unfollowingId: $unfollowingId)
    }
`

export const FOLLOWERS_QUERY = gql`
    query FollowersQuery($userId: String!) {
        followers(userId: $userId) {
            id
            user {
                id
                username
                avatarId
                followerCount
                profile {
                    id
                    description
                }
            }
        }
    }
`

export const FOLLOWINGS_QUERY = gql`
    query FollowingsQuery($userId: String!) {
        followings(userId: $userId) {
            id
            user {
                id
                username
                avatarId
                followerCount
                profile {
                    id
                    description
                }
            }
        }
    }
`

export const TOP_FOLLOWED_USERS_QUERY = gql`
    query TopFollowedUsersQuery {
        topFollowedUsers {
            user {
                id
                avatarId
                username
            }
            profile {
                description
                coverPhotoId
            }
            count
        }
    }
`
