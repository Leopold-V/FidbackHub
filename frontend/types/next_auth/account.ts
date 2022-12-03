export default interface IAccount {
  id: number;
  provider: string;
  type: string;
  refreshToken: string;
  access_token: string;
  accessTokenExpires: string;
}
