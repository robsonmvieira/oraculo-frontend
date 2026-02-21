import type { AudienceTemplate } from '../entities/AudienceTemplate.entity'

export interface IGetAudienceTemplateByIdUseCase {
  execute(id: string): Promise<AudienceTemplate | null>
}
