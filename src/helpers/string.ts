// eslint-disable-next-line no-useless-escape
export const HASHTAG_REGEXP = /\B(\#[a-zA-Z\d]+\b)(?!;)/g

/**
 * Extract hashtag from string
 * @param {string} str
 * @returns
 */
export const extractTags = (str: string) => str.match(HASHTAG_REGEXP)
