import { describe, it, vi, expect } from 'vitest'
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
});