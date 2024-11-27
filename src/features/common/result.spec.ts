import { describe, it, vi, expect } from 'vitest'
import { pipeWith } from 'ramda'
import { flatMapResult, Result } from './result';

describe('pipeWithHelper', () => {
	it('should apply the function to the success data if the result is of type "success"', () => {
		const curFun = vi.fn((data: number) => ({ type: 'success', successData: data * 2 } as Result<number, string>));
		const prevResult: Result<number, string> = { type: 'success', successData: 5 };
		const expectedResult: Result<number, string> = { type: 'success', successData: 10 };

		const actualResult = flatMapResult(curFun, prevResult);

		expect(actualResult).toEqual(expectedResult);
		expect(curFun).toHaveBeenCalledWith(prevResult.successData);
	});

	it('should return the original failure result if the result is of type "failure"', () => {
		const curFun = vi.fn((data: number) => ({ type: 'success', successData: data * 2 } as Result<number, string>));
		const prevResult: Result<number, string> = { type: 'failure', failureData: 'Error X' };

		const actualResult = flatMapResult<number, number, string>(curFun, prevResult);

		expect(actualResult).toEqual(prevResult);
		expect(curFun).not.toHaveBeenCalled();
	});

	it('run with Ramda pipe 1', () => {
		const fun1 = vi.fn((data: number) => ({ type: 'success', successData: data * 2 } as Result<number, string>));
		const fun2 = vi.fn((data: number) => ({ type: 'success', successData: data + 3 } as Result<number, string>));
		const composition = pipeWith(flatMapResult, [fun1, fun2]);
		const input = 5;

		const expectedResult: Result<number, string> = { type: 'success', successData: 13 };

		const actualResult = composition(input);

		expect(actualResult).toEqual(expectedResult);
		expect(fun1).toHaveBeenCalled();
		expect(fun2).toHaveBeenCalled();
	});

	it('run with Ramda pipe 2', () => {
		const fun1 = vi.fn((data: number) => ({ type: 'success', successData: data * 2 } as Result<number, string>));
		const fun2 = vi.fn((_: number) => ({ type: 'failure', failureData: 'fail in between' } as Result<number, string>));
		const fun3 = vi.fn((data: number) => ({ type: 'success', successData: data + 3 } as Result<number, string>));
		const composition = pipeWith(flatMapResult, [fun1, fun2, fun3]);
		const input = 5;

		const expectedResult: Result<number, string> = { type: 'failure', failureData: 'fail in between' };

		const actualResult = composition(input);

		expect(actualResult).toEqual(expectedResult);
		expect(fun1).toHaveBeenCalled();
		expect(fun2).toHaveBeenCalled();
		expect(fun3).not.toHaveBeenCalled();
	});
});