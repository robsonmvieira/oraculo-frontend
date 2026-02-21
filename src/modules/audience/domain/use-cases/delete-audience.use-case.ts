export interface DeleteAudienceParams {
  audienceId: string
}

export interface DeleteAudienceResult {
  deleted: boolean
}

export interface IDeleteAudienceUseCase {
  execute(params: DeleteAudienceParams): Promise<DeleteAudienceResult>
}
