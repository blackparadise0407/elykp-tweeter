import { useMutation } from '@apollo/client'

import { UPLOAD_FILE_MUTATION } from 'graphqlClient/queries/attachmentQuery'

interface FileUploadInput {
    file: File
    userId: string
}

export const useUploadFileMutation = () =>
    useMutation<
        { uploadFile: Attachment },
        {
            fileUploadInput: FileUploadInput
        }
    >(UPLOAD_FILE_MUTATION)
