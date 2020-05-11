import { Config } from '../rules'
import { fileExists, readFile } from './cliUtils'
import * as yaml from 'js-yaml'
import * as Ajv from 'ajv'
import schemaConf from '../schema.conf'

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

function formatErrors(errors: Ajv.ErrorObject[]) {
  return errors.map(error => {
      if (error.keyword === "additionalProperties") {
          return `Unexpected property "${error.data.invalidProp}"`;
      }
  }).map(message => `\t- ${message}.\n`).join("");
}

function validateSchema(config: Object) {
  const ajv = new Ajv({ verbose: true, schemaId: 'auto', missingRefs: 'ignore' })
  const validate = ajv.compile(schemaConf)
  if (!validate(config)) {
    throw new Error(`SQLint configuration is invalid:\n${formatErrors(validate.errors)}`)
  }
  return true
}

export function loadConfig(directory): Config {
  const file = configFiles.find(v => fileExists(`${directory}/${v.name}`))
  if (!file) {
    return defaultConfig
  }
  const fileContent = readFile(`${directory}/${file.name}`)
  let config: Config;
  switch(file.type) {
    case FileType.JSON: config = JSON.parse(fileContent); break
    case FileType.YAML: config = yaml.safeLoad(fileContent); break
  }
  validateSchema(config)
  return config
}