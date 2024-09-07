import { describe, it, expect } from 'vitest'
import { rxjsSample1 } from './rsjs-samples'

describe('rxjs sample1', () => {
    it('test', () => {
        const operations = rxjsSample1()
        expect(operations).toEqual(['begin', 'val1', 'val2', 'val3', 'done', 'end'])
    })
})