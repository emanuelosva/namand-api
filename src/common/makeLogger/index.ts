import { createLogger, format, transports, Logger } from 'winston'

export const makeLogger = (moduleName: string): Logger => {
  const logger = createLogger({
    format: format.combine(
      format.timestamp(),
      format.json(),
    ),
    defaultMeta: { service: `@${moduleName}` },
  })

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ssZ' }),
        format.colorize(),
        format.simple(),
      ),
    }))
  }

  return logger
}
