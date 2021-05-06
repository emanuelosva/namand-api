import {
  IStaffRepository,
  IFindStaffQueryOpts,
} from '@staffs/entities'
import logger from '@staffs/logger'
import { errorTypes } from '@staffs/constants'
import { StaffModuleError } from '@staffs/staffsError'

export const makeFindStaffById = (
  findById: IStaffRepository['findById'],
) => async (id: string, opts?: IFindStaffQueryOpts) => {
  logger.info(`Getting staff with id: ${id}`)

  const staff = await findById(id, opts)
  if (!staff) {
    logger.error(`Staff with id: ${id} not found`)
    throw new StaffModuleError(errorTypes.STAFF_DOES_NOT_EXISTS, 404)
  }

  return staff
}
