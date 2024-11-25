import { expect, test, describe, vi } from 'vitest'
import { testRun } from './promise-utils'
import { pipeWith, andThen } from 'ramda'

describe('Composing promises with Ramda', () => {
	test('reject on second step', async () => {
		const add1Async = vi.fn((x: string) => Promise.resolve(x + '1'))
		const rejectAsync = vi.fn((_: string) => Promise.reject('ERROR1'))
		const add2Sync = vi.fn((x: string) => x + '2')
		const add3Async = vi.fn((x: string) => Promise.resolve(x + '3'))
		const reject2Async = vi.fn((_: string) => Promise.reject('ERROR2'))
		const wasCaught = vi.fn((x: string) => x)
		const testPipe = pipeWith(andThen,
			[
				add1Async,
				rejectAsync,
				add2Sync,
				add3Async,
				reject2Async
			]
		)
		const res = await testPipe('input').catch(wasCaught)
		expect(add1Async).toHaveBeenCalled()
		expect(rejectAsync).toHaveBeenCalled()
		expect(add2Sync).not.toHaveBeenCalled()
		expect(add3Async).not.toHaveBeenCalled()
		expect(reject2Async).not.toHaveBeenCalled()
		expect(wasCaught).toHaveBeenCalled()
		expect(res).toBe('ERROR1')
		// expect(res).toBe('input1')
	})

	test('sync and async combination', async () => {
		// can chain sync and async functions
		const myChain = <A, B>(fn: (a: A) => B | Promise<B>, prevRes: Promise<A>) => {
			// if (prevRes instanceof Promise) {
			// 	prevRes = prevRes.then(res => {
			// 		console.log('myChain promise', res)
			// 		return res
			// 	})
			// } else {
			// 	console.log('myChain nonPromise', prevRes)
			// }
			return prevRes instanceof Promise ? prevRes.then(fn) : fn(prevRes)
		}
		const add1Async = vi.fn((x: string) => Promise.resolve(x + '1'))
		const add2Sync = vi.fn((x: string) => x + '2')
		const add3Async = vi.fn((x: string) => Promise.resolve(x + '3'))
		const wasCaught = vi.fn((x: string) => x)
		const testPipe = pipeWith(myChain,
			[
				add1Async,
				add2Sync,
				add3Async,
			]
		)
		const res = await testPipe('input').catch(wasCaught)
		expect(add1Async).toHaveBeenCalled()
		expect(add2Sync).toHaveBeenCalled()
		expect(add3Async).toHaveBeenCalled()
		expect(wasCaught).not.toHaveBeenCalled()
		expect(res).toBe('input123')
	})
})

test('Composing promises with custom solution', async () => {
	const res = await testRun()
	expect(res).toBe(true)
})