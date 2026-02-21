import type { Audience } from '../entities/Audience.entity'

export interface IGetAudienceByIdUseCase {
  execute(id: string): Promise<Audience | null>
}
