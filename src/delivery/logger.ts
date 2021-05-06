import { makeLogger } from '@common/index'
import config from '@delivery/config'

const logger = makeLogger(`${config.moduleName}`)

export default logger
