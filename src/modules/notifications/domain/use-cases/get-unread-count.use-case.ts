export interface IGetUnreadCountUseCase {
  execute(): Promise<number>
}
