import type { INotificationRepository } from '../../../domain/repositories'
import type { IGetUnreadCountUseCase } from '../../../domain/use-cases'

export class GetUnreadCountUseCase implements IGetUnreadCountUseCase {
  constructor(private readonly notificationRepository: INotificationRepository) {}

  async execute(): Promise<number> {
    return this.notificationRepository.getUnreadCount()
  }
}
