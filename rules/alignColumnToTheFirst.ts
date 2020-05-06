import { KeywordNode, SelectStatement } from '@joe-re/node-sql-parser'
import { Rule, Config, Context } from './index'

type Options = { allowMultipleColumnsPerLine: boolean }
const META = {
  name: 'align-column-to-the-first',
  type: 'select',
  options: { allowMultipleColumnsPerLine: Boolean },
};

export const alignColumnToTheFirst: Rule = {
  meta: META,
  create: (context: Context<SelectStatement, Config<Options>> ) => {
    if (context.config.level === 2) {
      if (Array.isArray(context.node.columns) && context.node.columns.length > 1) {
        const first = context.node.columns[0]
        const rest = context.node.columns.slice(1, context.node.columns.length)
        const invalidColumn = rest.find(v => {
          if (first.location.start.column === v.location.start.column) {
            return false
          }
          return first.location.start.column !== v.location.start.column
        })
        if (invalidColumn) {
          return {
            message: 'Columns must align to the first column.',
            location: invalidColumn.location
          }
        }
      }
    }
  }
}
