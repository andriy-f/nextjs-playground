
import { andThen, type AtLeastOneFunctionsFlow, AtLeastOneFunctionsFlowFromRightToLeft } from "ramda"

export const promisePipeFilter = (fn: (x: unknown) => unknown, result: Promise<unknown>) => andThen(fn, result)

// type SomeFunction<T = unknown, R = unknown> = (x: T) => R
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type PromiseFunction<T = unknown, R = unknown> = (x: T) => Promise<R>

export const myThen = (f: () => unknown) => (g: Promise<unknown>) => g.then(f)
// export const myThen = curry((f: any, g: Promise<any>) => g.then(f))

/** Compose regular functions */
const composeF = <TArgs extends unknown[], TResult>(...fns: AtLeastOneFunctionsFlow<TArgs, TResult>) => <TArgs extends unknown[]>(..._args: TArgs) => fns.reduceRight((acc, f) => f(acc), _args);

/** Compose promise-returning functions */
const composeM = (chainMethod: string) => <TArgs extends unknown[], TResult>(...ms: AtLeastOneFunctionsFlowFromRightToLeft<TArgs, TResult>) => (
    ms.reduce((f, g) => (x: unknown) => g(x)[chainMethod](f))
);

const composePromises = composeM('then');

const trace = (label: string) => (value: unknown) => {
    console.log(`${label}: ${value}`);
    return value;
};

const add3 = (x: number) => x + 3;
const multiply2 = (x: number) => x * 2;
const _addThenMultiply = composeF(multiply2, add3);

export const testRun = async () => {
    const label = 'API call composition';
    const myTrace = trace(label)
    // a => Promise(b)
    const getUserById = (id: number) => id === 3 ?
        Promise.resolve({ name: 'Kurt', role: 'Author' }) :
        undefined
        ;
    // b => Promise(c)
    const hasPermission = ({ role }: { role: string }) => (
        Promise.resolve(role === 'Author')
    );
    // Try to compose them. Warning: this will fail.
    // const authUser = composeF<any>(hasPermission, getUserById);
    // Oops! Always false!
    // authUser(3).then(myTrace);

    const authUser = composePromises(hasPermission, getUserById)
    return authUser(3).then(myTrace)
}