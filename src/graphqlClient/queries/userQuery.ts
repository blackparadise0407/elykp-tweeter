import { gql } from '@apollo/client'

export const CURRENT_USER_QUERY = gql`
    query CurrentUser {
        currentUser {
            id
            username
            email
            verified
            enabled
        }
    }
`

export const GET_USER_QUERY = gql`
    query GetUser($username: String!) {
        getUser(username: $username) {
            id
            username
            email
        }
    }
`
