import { AxiosResponse } from 'axios'
import { ITimeLogDto, ITimeLogResponseDto } from '@timelog/interfaces'
import ApiInstance from '@/api/index'

export default class TimeLogApi {
  static async createLogEntry(payload: ITimeLogDto): Promise<AxiosResponse<ITimeLogResponseDto>> {
    return ApiInstance.post('time-log/create', payload)
  }

  static async stopLogEntry(
    logId: string,
    payload: Required<Pick<ITimeLogDto, 'endDate'>>
  ): Promise<AxiosResponse<ITimeLogResponseDto>> {
    return ApiInstance.post(`time-log/stop/${logId}`, payload)
  }

  static async getStartedButNotStoppedLog(
    userId: string
  ): Promise<AxiosResponse<ITimeLogResponseDto | null>> {
    return ApiInstance.get(`time-log/started-log/${userId}`)
  }
}
