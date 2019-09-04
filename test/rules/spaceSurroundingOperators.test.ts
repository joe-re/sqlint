import { execute } from '../../rules'

test('space surrounding always', () => {
  const sql = `
SELECT *
FROM foo
WHERE foo.a > 1
   OR foo.b>=2
  AND foo.c=true
   OR foo.d <> false
`
  const result = execute(sql, { rules: { 'space-surrounding-operators': [ 2, 'always' ] } })
  expect(result.length).toEqual(2)

  expect(result[0].message).toEqual('space surrounding always')
  expect(result[0].location.start).toEqual({line: 5, offset: 46,  column: 12 })
  expect(result[0].location.end).toEqual({ line: 5, offset: 50, column: 16 })

  expect(result[1].message).toEqual('space surrounding always')
  expect(result[1].location.start).toEqual({line: 6, offset: 61,  column: 12 })
  expect(result[1].location.end).toEqual({ line: 6, offset: 64, column: 15 })
})