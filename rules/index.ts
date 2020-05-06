import { reservedWordCase } from './reservedWordCase'
import { spaceSurroundingOperators } from './spaceSurroundingOperators'
import { linebreakAfterClauseKeyword } from './linebreakAfterClauseKeyword'
import { columnNewLine } from './columnNewLine'
import { alignColumnToTheFirst } from './alignColumnToTheFirst'
import { whereClauseNewLine } from './whereClauseNewLine'
import { parse, NodeRange } from '@joe-re/node-sql-parser'

export type Rule = {
  meta: {
    name: string,
    type: string
  },
  create: Function
}

export type Config<T> = {
  level: number,
  options: T
}

export type Context<NODE = any, CONFIG = any> = {
  getSQL(range?: NodeRange, options?: { before?: number, after?: number }): string
  node: NODE
  config: CONFIG
}

let rules:{ rule: Rule, config: any, sql: string }[] = []

export function execute(sql: string, config: any) {
  rules = []
  registerRule(reservedWordCase, config, sql)
  registerRule(spaceSurroundingOperators, config, sql)
  registerRule(linebreakAfterClauseKeyword, config, sql)
  registerRule(columnNewLine, config, sql)
  registerRule(alignColumnToTheFirst, config, sql)
  registerRule(whereClauseNewLine, config, sql)
  const ast = parse(sql)
  return walk(ast)
}

function registerRule(rule: Rule, config: any, sql: string) {
  if (config.rules[rule.meta.name] && config.rules[rule.meta.name][0] >= 1) {
    const _config = {
      level: config.rules[rule.meta.name][0],
      options: config.rules[rule.meta.name].slice(1)
    }
    rules.push({ rule, config: _config, sql })
  }
}

function apply(node: any) {
  let diagnostics: any[] = []
  rules.forEach(({ rule, config, sql }) => {
    if (node.type === rule.meta.type) {
      diagnostics = diagnostics.concat(rule.create(createContext(sql, node, config)))
    }
  })
  return diagnostics.filter(v => !!v)
}

function walk(node: any, diagnostics: any[] = []) {
  if (!node || typeof node !== 'object' || !node.type) {
    return diagnostics
  }
  diagnostics = diagnostics.concat(apply(node))
  Object.values(node).forEach((v) => {
    diagnostics = walk(v, diagnostics)
  })
  return diagnostics
}

function createContext(sql: string, node: any, config: any): Context {
  return {
    getSQL: function(range, options) {
      if (!range) {
        return sql
      }
      const start = options && options.before ? range.start.offset - options.before : range.start.offset
      const end = options && options.after ? range.end.offset + options.after : range.end.offset
      return sql.slice(start, end)
    },
    node: node,
    config: config
  }
}
