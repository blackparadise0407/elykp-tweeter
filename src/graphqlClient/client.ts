import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    Reference,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

import { ACCESS_TOKEN } from 'constants/storage'

const authLink = setContext((_, { headers }) => {
    const token = sessionStorage.getItem(ACCESS_TOKEN)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const uploadLink = createUploadLink({ uri: 'http://localhost:5000/graphql' })

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                tweets: {
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
})

export const client = new ApolloClient({
    link: ApolloLink.from([authLink, uploadLink]),
    cache,
})
