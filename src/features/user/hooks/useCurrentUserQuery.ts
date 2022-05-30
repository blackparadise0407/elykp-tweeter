import { useQuery } from '@apollo/client'

import { CURRENT_USER_QUERY } from 'graphqlClient/queries/userQuery'

export const useCurrentUserQuery = () =>
    useQuery<{ currentUser: User }>(CURRENT_USER_QUERY)
