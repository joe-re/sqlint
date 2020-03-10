import { execute } from '../../rules'

test('valid case', () => {
  const sql = `
    SELECT
      foo.a,
      foo.b 
    FROM
      foo
  `
  const result = execute(sql, { rules: { 'column-new-line': [ 2 ] } })
  expect(result).toEqual([])
})

test("Columns must go on a new line", () => {
  const sql = `
    SELECT
      foo.a, foo.b 
    FROM
      foo
  `;
  const result = execute(sql, { rules: { "column-new-line": [2] } })
  expect(result.length).toEqual(1)
  expect(result[0].message).toEqual("Columns must go on a new line.")
  expect(result[0].location).toEqual({
    end: {
      column: 5,
      line: 4,
      offset: 36
    },
    start: {
      column: 14,
      line: 3,
      offset: 25
    }
  })
})
