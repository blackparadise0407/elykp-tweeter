import { useMutation } from '@apollo/client'

import { DELETE_FILE_MUTATION } from 'graphqlClient/queries/attachmentQuery'

export const useDeleleteFileMutation = () =>
    useMutation<{ deleteFile: boolean }, { attachmentId: string }>(
        DELETE_FILE_MUTATION,
    )
