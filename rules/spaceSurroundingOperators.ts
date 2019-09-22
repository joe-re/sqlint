import { BinaryExpressionNode } from '@joe-re/node-sql-parser'
import { Rule, Config, Context } from './index'

type Options = [ 'always' | 'never' ]
const META = {
  name: 'space-surrounding-operators',
  type: 'binary_expr',
  options: [ ['always', 'never'] ],
  messages: {
    always: 'space surrounding always',
    never: 'space surrounding never'
  }
}

export const spaceSurroundingOperators: Rule = {
  meta: META,
  create: (context: Context<BinaryExpressionNode, Config<Options>> ) => {
    if (!['+', '-', '*', '/', '>', '>=', '<', '<=', '!=', '<>', '='].includes(context.node.operator)) {
      return
    }
    if (context.config.options[0] === 'always') {
      const regexp = new RegExp(` ${context.node.operator} $`)
      const part = context.getSQL(context.node.left.location, { after: context.node.operator.length + 2})
      const result = regexp.exec(part)
      if (!result) {
        const start = {
          line: context.node.left.location.end.line,
          offset: context.node.left.location.end.offset,
          column: context.node.left.location.end.column
        }
        const end = {
          line: context.node.left.location.end.line,
          offset: context.node.left.location.end.offset + 2 + context.node.operator.length,
          column: context.node.left.location.end.column + 2 + context.node.operator.length
        }
        return {
          message: META.messages.always,
          location: { start, end }
        }
      }
    } else if (context.config.options[0] === 'never') {
      const regexp = new RegExp(`[^\s]${context.node.operator}[^\s]$`)
      const part = context.getSQL(context.node.left.location, { after: context.node.operator.length + 1})
      const result = regexp.exec(part)
      if (!result) {
        const start = {
          line: context.node.left.location.end.line,
          offset: context.node.left.location.end.offset,
          column: context.node.left.location.end.column
        }
        const end = {
          line: context.node.left.location.end.line,
          offset: context.node.left.location.end.offset + 1 + context.node.operator.length,
          column: context.node.left.location.end.column + 1 + context.node.operator.length
        }
        return {
          message: META.messages.never,
          location: { start, end }
        }
      }
    }
  }
}
