import { KeywordNode } from '@joe-re/node-sql-parser'
import { Rule, RuleConfig, Context } from './index'

type Option = 'upper' | 'lower'
const DefaultOption = 'upper'
const META = {
  name: 'reserved-word-case',
  type: 'keyword',
  messages: {
    upper: 'reserved word must be uppercase',
    lower: 'reserved word must be lowercase'
  }
};

export const reservedWordCase: Rule = {
  meta: META,
  create: (context: Context<KeywordNode, RuleConfig<Option>> ) => {
    const option = context.config.option || DefaultOption
    if (option === 'upper' && /[a-z]/.test(context.node.value)) {
      return {
        message: META.messages.upper,
        location: context.node.location
      }
    }
    if (option === 'lower' && /[A-Z]/.test(context.node.value)) {
      return {
        message: META.messages.lower,
        location: context.node.location
      }
    }
  }
}