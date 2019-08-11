import { KeywordNode } from '@joe-re/node-sql-parser'

export const reservedWordCase = {
  meta: {
    name: 'reserved-word-case',
    type: 'keyword',
    options: { enum: ['upper', 'lower'] },
    messages: {
      upper: 'reserved word must be uppercase',
      lower: 'reserved word must be lowercase'
    },
  },
  create: (node: KeywordNode) => {
    if (/[a-z]/.test(node.value)) {
      return {
        message: 'reserved word must be uppercase',
        location: node.location
      }
    }
  }
}