import type { DismissAlertResult } from '../repositories'

export interface IDismissAlertUseCase {
  execute(audienceId: string, alertId: string): Promise<DismissAlertResult>
}
