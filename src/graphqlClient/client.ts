import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { ACCESS_TOKEN } from 'constants/storage'

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
})

const authLink = setContext((_, { headers }) => {
    const token = sessionStorage.getItem(ACCESS_TOKEN)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})
