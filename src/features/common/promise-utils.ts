
import { andThen, otherwise, curry } from "ramda"

export const promisePipeFilter = (fn: (x: any) => any, result: Promise<unknown>) => andThen(fn, result)

type SomeFunction<T = any, R = any> = (x: T) => R
type PromiseFunction<T = any, R = any> = (x: T) => Promise<R>

export const myThen = (f: any) => (g: Promise<any>) => g.then(f)
// export const myThen = curry((f: any, g: Promise<any>) => g.then(f))

/** Compose regular functions */
const composeF = <T>(...fns: SomeFunction[]) => (x: T) => fns.reduceRight((acc, f) => f(acc), x);

/** Compose promise-returning functions */
const composeM = (chainMethod: string) => (...ms: SomeFunction[]) => (
    ms.reduce((f, g) => (x: any) => g(x)[chainMethod](f))
);

const composePromises = composeM('then');

const trace = (label: string) => (value: unknown) => {
    console.log(`${label}: ${value}`);
    return value;
};

const add3 = (x: number) => x + 3;
const multiply2 = (x: number) => x * 2;
const addThenMultiply = composeF(multiply2, add3);

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