import type { INotificationRepository } from '../../../domain/repositories'
import type { IMarkNotificationReadUseCase } from '../../../domain/use-cases'

export class MarkNotificationReadUseCase implements IMarkNotificationReadUseCase {
  constructor(private readonly notificationRepository: INotificationRepository) {}

  async execute(id: string): Promise<void> {
    return this.notificationRepository.markAsRead(id)
  }
}
