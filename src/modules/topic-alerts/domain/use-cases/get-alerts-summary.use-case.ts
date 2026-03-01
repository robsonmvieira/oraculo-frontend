import type { AlertsSummary } from '../repositories'

export interface IGetAlertsSummaryUseCase {
  execute(audienceId: string): Promise<AlertsSummary>
}
