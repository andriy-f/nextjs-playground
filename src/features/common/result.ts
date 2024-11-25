export type Success<S> = {
    type: 'success'
    successData: S
}

export type Failure<F> = {
    type: 'failure'
    failureData: F
}

export type Result<S, F> = Success<S> | Failure<F>

/**
 * Function used for binding (chaining) monadic functions. Also known as flatMap. Unwraps result and feeds to fn
 * @param fn Monad function (input normal, output monad)
 * @param result previous monad result (Result) which 
 * @returns result of applying function to "unwrapped" result
 */
export const flatMapResult =
    <A = unknown, B = unknown, F = unknown>(fn: (input: A) => Result<B, F>, result: Result<A, F>): Result<B, F> =>
        result.type === 'success' ? fn(result.successData) : result
