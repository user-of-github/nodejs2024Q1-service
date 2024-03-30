export interface JWTPayloadRaw {
  userId: string;
  login: string;
}

export interface TokenResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export type WithRefreshToken = {
  refreshToken: string;
} & Record<string, any>;