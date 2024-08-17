import { expect, test, describe, it, vi } from 'vitest'
import { promisePipeFilter, testRun, myThen } from './promise-utils'
import { pipeWith, otherwise, andThen, pipe, identity } from 'ramda'

test('Composing promises with Ramda', async () => {
	const add1Async = vi.fn((x: string) => Promise.resolve(x + '1'))
	const rejectAsync = vi.fn((x: string) => Promise.reject('ERROR1'))
	const add2Sync = vi.fn((x: string) => x + '2')
	const add3Async = vi.fn((x: string) => Promise.resolve(x + '3'))
	const reject2Async = vi.fn((x: string) => Promise.reject('ERROR2'))
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

test('Composing promises with custom solution', async () => {
	const res = await testRun()
	expect(res).toBe(true)
})