import { KeywordNode } from '@joe-re/node-sql-parser'
import { Rule, RuleConfig, Context } from './index'

const META = {
  name: 'linebreak-after-clause-keyword',
  type: 'keyword'
};

export const linebreakAfterClauseKeyword: Rule = {
  meta: META,
  create: (context: Context<KeywordNode, RuleConfig<{}>> ) => {
    const regexp = new RegExp(/\n|\r\n|\r$/)
    const part = context.getSQL(context.node.location, { after: 1})
    const result = regexp.exec(part)
    if (!result) {
      return {
        message: `A linebreak is required after ${context.node.value} keyword`,
        location: context.node.location
      }
    }
  }
}