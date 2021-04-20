import dotenv from 'dotenv'
import path from 'path'
import { getEnv } from '@common/index'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

export default {
  moduleName: 'authentication-module',
  AUTH_SECRET: getEnv.string('AUTH_SECRET', 'secret'),
}
