import type { ITopicAlertRepository, DismissAlertResult } from '../../../domain/repositories'
import type { IDismissAlertUseCase } from '../../../domain/use-cases'

export class DismissAlertUseCase implements IDismissAlertUseCase {
  constructor(private readonly topicAlertRepository: ITopicAlertRepository) {}

  async execute(audienceId: string, alertId: string): Promise<DismissAlertResult> {
    return this.topicAlertRepository.dismissAlert(audienceId, alertId)
  }
}
