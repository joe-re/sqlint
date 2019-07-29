import { Parser } from '@joe-re/node-sql-parser'

export function reservedWordCase(sql: string) {
  const ast = Parser.parse(sql)
  if (ast.type === 'select' && ast.keyword.value !== 'SELECT') {
    return {
      message: 'reserved word must be upperword',
      location: ast.keyword.location
    }
  }
  return null
}