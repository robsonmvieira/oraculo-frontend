import type { ListAlertsParams, ListAlertsResult } from '../repositories'

export interface IListAlertsUseCase {
  execute(params: ListAlertsParams): Promise<ListAlertsResult>
}
