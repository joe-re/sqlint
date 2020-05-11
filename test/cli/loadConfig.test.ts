import { loadConfig } from '../../cli/loadConfig'

describe('loadConfig', () => {
  describe('valid config', () => {
    test('load .sqlintrc.json', () => {
      const result = loadConfig(`${__dirname}/fixtures`)
      expect(result).toMatchObject({ rules: { "column-new-line": "error" } })
    })
  })
})
