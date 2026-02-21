import type { Audience } from '../entities/Audience.entity'

export interface IListUserAudiencesUseCase {
  execute(): Promise<Audience[]>
}
