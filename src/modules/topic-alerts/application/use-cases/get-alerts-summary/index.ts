import type { ITopicAlertRepository, AlertsSummary } from '../../../domain/repositories'
import type { IGetAlertsSummaryUseCase } from '../../../domain/use-cases'

export class GetAlertsSummaryUseCase implements IGetAlertsSummaryUseCase {
  constructor(private readonly topicAlertRepository: ITopicAlertRepository) {}

  async execute(audienceId: string): Promise<AlertsSummary> {
    return this.topicAlertRepository.getAlertsSummary(audienceId)
  }
}
