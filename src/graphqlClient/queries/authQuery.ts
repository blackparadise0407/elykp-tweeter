import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
    mutation LoginMutation($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
            accessToken
            user {
                id
                email
                username
            }
        }
    }
`
export const REGISTER_MUTATION = gql`
    mutation RegisterMutation($registerInput: RegisterInput!) {
        register(registerInput: $registerInput)
    }
`
