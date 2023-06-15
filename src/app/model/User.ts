export class User {

  constructor(
    private _id: string,
    private _login: string,
    private _displayName: string,
    private _profileImageURL: string,
    private _offlineImageURL: string) {
  }

  public get offlineImageURL(): string {
    return this._offlineImageURL;
  }
  public set offlineImageURL(value: string) {
    this._offlineImageURL = value;
  }
  public get profileImageURL(): string {
    return this._profileImageURL;
  }
  public set profileImageURL(value: string) {
    this._profileImageURL = value;
  }
  public get displayName(): string {
    return this._displayName;
  }
  public set displayName(value: string) {
    this._displayName = value;
  }
  public get login(): string {
    return this._login;
  }
  public set login(value: string) {
    this._login = value;
  }
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
}
