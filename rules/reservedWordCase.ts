import { KeywordNode } from '@joe-re/node-sql-parser'
import { Rule, Config } from './index'

type Options = [ 'upper' | 'lower' ]
const META = {
  name: 'reserved-word-case',
  type: 'keyword',
  options: [ ['upper', 'lower'] ],
  messages: {
    upper: 'reserved word must be uppercase',
    lower: 'reserved word must be lowercase'
  }
};

export const reservedWordCase: Rule = {
  meta: META,
  create: (node: KeywordNode, config: Config<Options> ) => {
    if (config.options[0] === 'upper' && /[a-z]/.test(node.value)) {
      return {
        message: META.messages.upper,
        location: node.location
      }
    }
    if (config.options[0] === 'lower' && /[A-Z]/.test(node.value)) {
      return {
        message: META.messages.lower,
        location: node.location
      }
    }
  }
}