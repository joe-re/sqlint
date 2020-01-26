import { KeywordNode } from '@joe-re/node-sql-parser'
import { Rule, Config, Context } from './index'

type Options = [ 'always']
const META = {
  name: 'linebreak-after-clause-keyword',
  type: 'keyword',
  options: [ ['always'] ],
  messages: {
    needlineBreak: 'A linebreak is required after',
    lower: 'reserved word must be lowercase'
  }
};

export const linebreakAfterClauseKeyword: Rule = {
  meta: META,
  create: (context: Context<KeywordNode, Config<Options>> ) => {
    if (context.config.options[0] === 'always') {
      const regexp = new RegExp(/\n|\r\n|\r$/)
      const part = context.getSQL(context.node.location, { after: 1})
      const result = regexp.exec(part)
      if (!result) {
        return {
          message: 'A linebreak is required after',
          location: context.node.location
        }
      }
    }
  }
}