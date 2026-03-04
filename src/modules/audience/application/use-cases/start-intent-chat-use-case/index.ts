import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IStartIntentChatUseCase, StartIntentChatParams, StartIntentChatResult } from '@/modules/audience/domain/use-cases'

export class StartIntentChatUseCase implements IStartIntentChatUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: StartIntentChatParams): Promise<StartIntentChatResult> {
    return this.audienceRepository.startIntentChat(params)
  }
}
