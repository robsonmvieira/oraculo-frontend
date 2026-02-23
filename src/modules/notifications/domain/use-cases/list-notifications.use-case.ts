import type { ListNotificationsParams, ListNotificationsResult } from '../repositories'

export interface IListNotificationsUseCase {
  execute(params: ListNotificationsParams): Promise<ListNotificationsResult>
}
