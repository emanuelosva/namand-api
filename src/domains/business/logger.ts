import { makeLogger } from '../../common'
import config from './config'

const logger = makeLogger(config.moduleName)

export default logger
