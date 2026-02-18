import type { Audience } from '../entities/Audience.entity'

export interface IListGenericAudiencesUseCase {
  execute(): Promise<Audience[]>
}
