const VALID_MIME_TYPE = ['image/jpeg', 'image/png', 'image/jpg']

/**
 *
 * @param {File} file
 * @returns
 */
export const isValidMimeType = (file: File) =>
    VALID_MIME_TYPE.includes(file.type)

/**
 *
 * @param {File} file
 * @param {number} limit Default limit is set to 3 Mb
 * @returns
 */
export const isUnderLimitSize = (file: File, limit: number = 3 * 1000 * 1000) =>
    file.size < limit
