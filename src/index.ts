import server from '@delivery/server'
import config from '@delivery/config'
import logger from '@delivery/logger'

if (require.main) {
  const handleError = (error) => {
    logger.error(`Unexpected error, ${error.message}`, { error })
    process.exit(1)
  }

  server.listen(config.PORT, (error, address) => {
    if (error) handleError(error)
    logger.info(`🚀 Server listen on: ${address}`)
  })

  process.on('unhandledRejection', handleError)
  process.on('uncaughtException', handleError)
}

export default server
module.exports = server
