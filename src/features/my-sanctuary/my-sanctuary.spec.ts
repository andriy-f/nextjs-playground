import { test, expect } from "vitest";
import S from './my-sanktuary'

test('test my-sanctuary module', () => {
	const actualRes = S.takeWhile(S.lt(4))([1, 2, 3, 4, 5, 6])
	const expected = [1, 2, 3]
	expect(actualRes).toStrictEqual(expected)
})