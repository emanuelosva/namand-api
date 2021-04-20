import config from '@authentication/config'
import { makeLogger } from '@common/index'

const logger = makeLogger(config.moduleName)

export default logger
