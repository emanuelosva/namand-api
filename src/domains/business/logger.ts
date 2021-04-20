import { makeLogger } from '@common/index'
import config from '@business/config'

const logger = makeLogger(config.moduleName)

export default logger
