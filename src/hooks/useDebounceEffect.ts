import { useEffect, DependencyList } from 'react'

export function useDebounceEffect(
    fn: () => void,
    waitTime: number,
    deps?: DependencyList,
) {
    useEffect(() => {
        const t = setTimeout(() => {
            // eslint-disable-next-line
            fn.apply(undefined, deps as any)
        }, waitTime)

        return () => {
            clearTimeout(t)
        }
    }, deps)
}
