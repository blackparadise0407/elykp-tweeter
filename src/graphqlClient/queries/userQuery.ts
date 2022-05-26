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
