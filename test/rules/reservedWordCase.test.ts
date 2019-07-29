import { reservedWordCase } from '../../rules/reservedWordCase'

test('valid case', () => {
  const result = reservedWordCase('SELECT * FROM foo')
  expect(result).toBeNull()
})

test('select keyword must be uppercase', () => {
  const result = reservedWordCase('select * FROM foo')
  expect(result.message).toEqual('reserved word must be upperword')
  expect(result.location.start).toEqual({line: 1, offset: 0,  column: 1 })
  expect(result.location.end).toEqual({ line: 1, offset: 6, column: 7 })
})