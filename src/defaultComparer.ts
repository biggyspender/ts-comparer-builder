export const defaultComparer = <T>(a: T, b: T): number => (a > b ? 1 : a < b ? -1 : 0)
