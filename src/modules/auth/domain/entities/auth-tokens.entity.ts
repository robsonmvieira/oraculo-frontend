interface AuthTokensProps {
  access_token: string
  refresh_token: string
  token_type: string
}

export class AuthTokens {
  private readonly accessToken: string
  private readonly refreshToken: string
  private readonly tokenType: string

  constructor({ access_token, refresh_token, token_type }: AuthTokensProps) {
    this.accessToken = access_token
    this.refreshToken = refresh_token
    this.tokenType = token_type
  }

  getAccessToken(): string {
    return this.accessToken
  }

  getRefreshToken(): string {
    return this.refreshToken
  }

  getTokenType(): string {
    return this.tokenType
  }
}
