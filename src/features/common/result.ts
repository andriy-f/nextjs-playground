export type Success<S> = {
    type: 'success'
    successData: S
}

export type Failure<F> = {
    type: 'failure'
    failureData: F
}

export type Result<S = any, F = any> = Success<S> | Failure<F>

/**
 * Function used for binding (chaining) monadic functions. Also known as flatMap.
 * @param fn Monad function (input normal, output monad)
 * @param result previous monad result (Result) which 
 * @returns result of applying function to "unwrapped" result
 */
export const pipeWithHelper =
    (fn: Function, result: Result<unknown, unknown>): Result<unknown, unknown> =>
        result.type === 'success' ? fn(result.successData) : result
