import type { INotificationRepository } from '../../../domain/repositories'
import type { IMarkAllReadUseCase } from '../../../domain/use-cases'

export class MarkAllReadUseCase implements IMarkAllReadUseCase {
  constructor(private readonly notificationRepository: INotificationRepository) {}

  async execute(): Promise<void> {
    return this.notificationRepository.markAllAsRead()
  }
}
