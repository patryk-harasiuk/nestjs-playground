// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LoginUserRequest extends Request {}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export type JwtPayload = {
  sub: number;
  email: string;
};
