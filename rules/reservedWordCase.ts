import { KeywordNode } from '@joe-re/node-sql-parser'
import { Rule, Config, Context } from './index'

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
  create: (context: Context<KeywordNode, Config<Options>> ) => {
    if (context.config.options[0] === 'upper' && /[a-z]/.test(context.node.value)) {
      return {
        message: META.messages.upper,
        location: context.node.location
      }
    }
    if (context.config.options[0] === 'lower' && /[A-Z]/.test(context.node.value)) {
      return {
        message: META.messages.lower,
        location: context.node.location
      }
    }
  }
}