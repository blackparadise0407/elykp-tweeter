import { gql } from '@apollo/client'

export const UPLOAD_FILE_MUTATION = gql`
    mutation UploadFileMutation($fileUploadInput: FileUploadInput!) {
        uploadFile(fileUploadInput: $fileUploadInput) {
            id
            path
        }
    }
`
