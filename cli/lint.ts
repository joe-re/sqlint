import { getFileList } from './cliUtils'
export function lint (path: string) {
  const files = getFileList(path)
  if (files.length === 0) {
    throw new Error(`No files matching '${path}' were found.`)
  }
  return files
}
