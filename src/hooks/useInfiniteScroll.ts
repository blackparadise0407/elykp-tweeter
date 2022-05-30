import { throttle } from 'lodash'
import { RefObject } from 'react'

import { useEventListener } from './useEventListener'

export function useInfiniteScroll<T extends HTMLElement>(
    ref: RefObject<T>,
    fetching: boolean,
    canLoadMore: boolean,
    onLoadMore: () => void,
) {
    useEventListener(
        'scroll',
        throttle(() => {
            if (ref.current) {
                const { offsetTop, clientHeight } = ref.current
                const { scrollY, innerHeight } = window
                if (
                    offsetTop + clientHeight - (innerHeight + scrollY) <= 0 &&
                    canLoadMore &&
                    !fetching
                ) {
                    onLoadMore()
                }
            }
        }, 500),
    )
}
