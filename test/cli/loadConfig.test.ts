import { loadConfig } from '../../cli/loadConfig'

describe('loadConfig', () => {
  describe('valid config', () => {
    test('load .sqlintrc.json', () => {
      const result = loadConfig(`${__dirname}/fixtures/loadconfig/json`)
      expect(result).toMatchObject({ rules: { "column-new-line": "error" } })
    })
    test('load .sqlintrc.yaml', () => {
      const result = loadConfig(`${__dirname}/fixtures/loadconfig/yaml`)
      expect(result).toMatchObject({ rules: { "column-new-line": "error" } })
    })
  })
})
