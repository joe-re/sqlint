import { getFileList } from '../../cli/cliUtils'
describe('getFileList',() => {
  describe('file case', () => {
    test('it should get only one file that specified', () => {
      const result = getFileList(`${__dirname}/fixtures/a.sql`)
      expect(result.length).toEqual(1)
      expect(result[0]).toContain('/cli/fixtures/a.sql')
    })
  })
  describe('directory case', () => {
    test('it should get all files under specified directory', () => {
      const result = getFileList(`${__dirname}/fixtures`)
      expect(result.length).toEqual(6)
      expect(result[0]).toContain('/cli/fixtures/a.sql')
      expect(result[1]).toContain('/cli/fixtures/b.sql')
      expect(result[2]).toContain('/cli/fixtures/dir1/c.sql')
      expect(result[3]).toContain('/cli/fixtures/dir1/d.sql')
      expect(result[4]).toContain('/cli/fixtures/dir1/dir2/e.sql')
      expect(result[5]).toContain('/cli/fixtures/dir1/dir2/f.sql')
    })
  })
  describe('not exists case', () => {
    test('it should get empty array', () => {
      const result = getFileList(`${__dirname}/not_exists`)
      expect(result.length).toEqual(0)
    })
  })
})