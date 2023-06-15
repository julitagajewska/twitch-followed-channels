export class AccessTokenResponse {
  constructor(private _accessToken: string){
    this._accessToken = _accessToken;
  }

  public get accessToken(): string {
    return this._accessToken;
  }

  public set accessToken(value: string) {
    this._accessToken = value;
  }
}
