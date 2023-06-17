import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { AdminService } from './admin.service'
import sendResponse from '../../../shared/sendResponse'
import { IAdmin } from './admin.interface'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { adminFilterableFields } from './admin.constant'
import { paginationFields } from '../../../constants/pagination'

const getAllAdminData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AdminService.getAllAdminDataDb(
    filters,
    paginationOptions
  )

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const updateAdminData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const adminData = req.body

  const result = await AdminService.updateAdminDataDb(id, adminData)
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  })
})

const getSingleAdminData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AdminService.getSingleAdminDataDb(id)
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  })
})

const deleteSingleAdminData = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await AdminService.deleteSingleAdminDataDb(id)
    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin retrieved successfully',
      data: result,
    })
  }
)

export {
  getAllAdminData,
  getSingleAdminData,
  deleteSingleAdminData,
  updateAdminData,
}
