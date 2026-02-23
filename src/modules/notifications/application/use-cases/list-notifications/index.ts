import type { INotificationRepository, ListNotificationsParams, ListNotificationsResult } from '../../../domain/repositories'
import type { IListNotificationsUseCase } from '../../../domain/use-cases'

export class ListNotificationsUseCase implements IListNotificationsUseCase {
  constructor(private readonly notificationRepository: INotificationRepository) {}

  async execute(params: ListNotificationsParams): Promise<ListNotificationsResult> {
    return this.notificationRepository.listNotifications(params)
  }
}
