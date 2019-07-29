import { Parser } from '@joe-re/node-sql-parser'

const sql = `
  select id as a_id
  from a_table
`
function reservedWordCase() {
  const ast = Parser.parse(sql)
  if (ast.type === 'select' && ast.keyword.value !== 'SELECT') {
    console.log(ast.keyword.location)
    console.log('reserved word must be upperword')
  }
}

reservedWordCase()