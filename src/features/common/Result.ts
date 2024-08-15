export type Success<S> = {
    type: 'success'
    successData: S
}

export type Failure<F> = {
    type: 'failure'
    failureData: F
}

export type Result<S, F> = Success<S> | Failure<F>