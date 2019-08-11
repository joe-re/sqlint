import { reservedWordCase } from './reservedWordCase'
import { parse } from '@joe-re/node-sql-parser'

type Rule = {
  meta: {
    name: string,
    type: string
  },
  create: Function
}

let rules: Rule[] = []
function registerRule(rule: Rule, config: any) {
  if (config.rules[rule.meta.name] && config.rules[rule.meta.name][0] >= 1) {
    rules.push(rule)
  }
}

function apply(node: any) {
  let diagnostics: any[] = []
  rules.forEach(rule => {
    if (node.type === rule.meta.type) {
      diagnostics = diagnostics.concat(rule.create(node))
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

export function execute(sql: string, config: any) {
  rules = []
  registerRule(reservedWordCase, config)
  const ast = parse(sql)
  return walk(ast)
}