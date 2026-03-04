import type { YouTubeCollectedVideo } from '../entities/YouTubeCollectedVideo.entity'

export interface GetYouTubeValidationVideosParams {
  audienceId: string
  topicName: string
}

export interface GetYouTubeValidationVideosResult {
  status: string
  validationId: string
  topicName: string
  videosCount: number
  videos: YouTubeCollectedVideo[]
}

export interface IGetYouTubeValidationVideosUseCase {
  execute(params: GetYouTubeValidationVideosParams): Promise<GetYouTubeValidationVideosResult>
}
