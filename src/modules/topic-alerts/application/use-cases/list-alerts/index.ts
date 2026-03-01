import type { ITopicAlertRepository, ListAlertsParams, ListAlertsResult } from '../../../domain/repositories'
import type { IListAlertsUseCase } from '../../../domain/use-cases'

export class ListAlertsUseCase implements IListAlertsUseCase {
  constructor(private readonly topicAlertRepository: ITopicAlertRepository) {}

  async execute(params: ListAlertsParams): Promise<ListAlertsResult> {
    return this.topicAlertRepository.listAlerts(params)
  }
}
