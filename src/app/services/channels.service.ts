import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, mergeMap, Observable, of, tap, zip } from 'rxjs';

import { AccessTokenResponse } from '../model/AccessTokenResponse';
import { AccessTokenResponseType } from '../model/IAccessTokenResponse';
import { GetUsersResponse } from '../model/GetUsersResponse';
import { UserType } from '../model/UserType';
import { User } from '../model/User';
import { FollowedUserType } from '../model/FollowedUser';
import { FollowedUserResponseType } from '../model/FollowedUser';
import { UserResponseType } from '../model/UserResponseType';
import { ResultType } from '../model/ResultType';


interface keys {
  clientSecret: string
}

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  accessToken: string = '';
  clientSecret!: string;
  clientId: string = "roverzts6initblnpyy8m4i2fgffzb"
  userFrom!: User;
  keyData!: keys;


  constructor(private http: HttpClient) {

    this.keyData = require("../../files/keys.json");

    let body = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: "client_credentials"
    }

    this.getSecret();
  }

  getSecret() {
    this.clientSecret = this.keyData.clientSecret;
  }

  getAccessToken(): Observable<AccessTokenResponseType> {
    let body = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: "client_credentials"
    }

    return this.http.post<AccessTokenResponseType>('https://id.twitch.tv/oauth2/token', body)
  }

  getUser(username: string, accessToken: string): Observable<UserResponseType> {
    const headers = {
      "Authorization": `Bearer ${accessToken}`,
      "Client-Id": "roverzts6initblnpyy8m4i2fgffzb"
    }

    return this.http.get<UserResponseType>(`https://api.twitch.tv/helix/users?login=${username}`, {headers: headers});
  }

  getFollowedUser(username: string, accessToken: string): Observable<UserResponseType> {
    const headers = {
      "Authorization": `Bearer ${accessToken}`,
      "Client-Id": "roverzts6initblnpyy8m4i2fgffzb"
    }

    return this.http.get<UserResponseType>(`https://api.twitch.tv/helix/users?login=${username}`, {headers: headers});
  }

  getFollowed(userId: string, accessToken: string): Observable<FollowedUserResponseType> {
    const headers = {
      "Authorization": `Bearer ${accessToken}`,
      "Client-Id": this.clientId
    }

    return this.http.get<FollowedUserResponseType>(`https://api.twitch.tv/helix/users/follows?from_id=${userId}`, {headers: headers});
  }

  getAllData(username: string, accessToken: string) {
      // Find user ID based on the username

       this.getUser(username, accessToken).pipe(
        mergeMap((response) => {
          return zip(of(response), this.getFollowed(response.data[0].id, accessToken)) // --
        })
      ).pipe(
        map((prevResponses) => {
          let calls: any[] = [];
          prevResponses[1].data.forEach((followedUser) => {
            calls.push(this.getUser(followedUser.to_id, accessToken))
          })

          return calls;
        })
      )

  }
}
