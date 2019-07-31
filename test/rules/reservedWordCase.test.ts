import { execute } from '../../rules'

test('valid case', () => {
  const result = execute('SELECT * FROM foo', { rules: { 'reserved-word-case': [ 2, 'upper' ] } })
  expect(result).toEqual([])
})

test('select keyword must be uppercase', () => {
  const result = execute('select * FROM foo', { rules: { 'reserved-word-case': [ 2, 'upper' ] } })
  expect(result.length).toEqual(1)
  expect(result[0].message).toEqual('reserved word must be uppercase')
  expect(result[0].location.start).toEqual({line: 1, offset: 0,  column: 1 })
  expect(result[0].location.end).toEqual({ line: 1, offset: 6, column: 7 })
})

test('from keyword must be uppercase', () => {
  const result = execute('SELECT * from foo', { rules: { 'reserved-word-case': [ 2, 'upper' ] } })
  expect(result.length).toEqual(1)
  expect(result[0].message).toEqual('reserved word must be uppercase')
  expect(result[0].location.start).toEqual({line: 1, offset: 9,  column: 10 })
  expect(result[0].location.end).toEqual({ line: 1, offset: 13, column: 14 })
})