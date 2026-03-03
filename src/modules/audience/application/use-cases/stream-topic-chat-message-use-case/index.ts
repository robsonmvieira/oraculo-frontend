import type { IAudienceRepository } from '../../../domain/repositories/audience.repository'
import type { IStreamTopicChatMessageUseCase, StreamTopicChatMessageParams, StreamTopicChatMessageCallbacks } from '../../../domain/use-cases/stream-topic-chat-message.use-case'

export class StreamTopicChatMessageUseCase implements IStreamTopicChatMessageUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: StreamTopicChatMessageParams, callbacks: StreamTopicChatMessageCallbacks, signal?: AbortSignal): Promise<void> {
    return this.audienceRepository.streamTopicChatMessage(params, callbacks, signal)
  }
}
