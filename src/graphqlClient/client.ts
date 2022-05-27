import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    Reference,
} from '@apollo/client'
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
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    getTweet: {
                        keyArgs: false,
                        merge(existing, incoming) {
                            let tweets: Reference[] = []
                            if (existing && existing.tweets) {
                                tweets = tweets.concat(existing.tweets)
                            }
                            if (incoming && incoming.tweets) {
                                tweets = tweets.concat(incoming.tweets)
                            }
                            return {
                                ...incoming,
                                tweets,
                            }
                        },
                    },
                },
            },
        },
    }),
})
