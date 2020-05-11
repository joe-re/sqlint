import { Config } from '../rules'
import { fileExists, readFile } from "./cliUtils"

const configFilenames = [
  '.sqlintrc.json'
]

const defaultConfig: Config = {
  rules: {}
}

export function loadConfig(directory) {
  const path = configFilenames.map(v => `${directory}/${v}`).find(v => fileExists)
  if (!path) {
    return defaultConfig
  }
  const config = readFile(path)
  return JSON.parse(config)
}