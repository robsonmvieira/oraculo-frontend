import type { ContentDraftPlatform } from '../entities/ContentDraft.entity'

export interface TriggerContentProductionParams {
  audienceId: string
  suggestionId: string
  targetPlatforms: ContentDraftPlatform[]
}

export interface TriggerContentProductionResult {
  status: 'processing' | 'already_exists'
  suggestionId: string
  platforms: string[]
  message: string
}

export interface ITriggerContentProductionUseCase {
  execute(params: TriggerContentProductionParams): Promise<TriggerContentProductionResult>
}
