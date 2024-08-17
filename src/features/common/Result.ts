export type Success<S> = {
    type: 'success'
    successData: S
}

export type Failure<F> = {
    type: 'failure'
    failureData: F
}

export type Result<S, F> = Success<S> | Failure<F>

export const pipeWithHelper =
    (fn: Function, result: Result<unknown, unknown>): Result<unknown, unknown> =>
        result.type === 'success' ? fn(result.successData) : result
