import { Config } from '../rules'
import { fileExists, readFile } from './cliUtils'
import * as yaml from 'js-yaml'

enum FileType {
  JSON = 'json',
  YAML = 'yaml'
}
const configFiles = [
  { name: '.sqlintrc.json', type: FileType.JSON },
  { name: '.sqlintrc.yaml', type: FileType.YAML },
  { name: '.sqlintrc.yml', type: FileType.YAML },
]

const defaultConfig: Config = {
  rules: {}
}

export function loadConfig(directory) {
  const file = configFiles.find(v => fileExists(`${directory}/${v.name}`))
  if (!file) {
    return defaultConfig
  }
  const config = readFile(`${directory}/${file.name}`)
  switch(file.type) {
    case FileType.JSON: return JSON.parse(config)
    case FileType.YAML: return yaml.safeLoad(config)
  }
}