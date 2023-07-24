export type Pretty<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

export type Assign<T, P> = Omit<T, keyof P> & P
