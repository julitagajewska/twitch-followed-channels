import { Component } from '@angular/core';
import { ChannelsService } from './services/channels.service';
import { User } from './model/User';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserResponseType } from './model/UserResponseType';
import { UserType } from './model/UserResponseType';
import { FollowedUserType } from './model/FollowedUser';
import { FollowedUserTile } from './model/FollowedUserTile';
import { Observable, forkJoin, mergeMap, zip, of, map, flatMap, merge, defaultIfEmpty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'twitch-followed-channels';

  parameters = {
    "client_id": "roverzts6initblnpyy8m4i2fgffzb",
    "redirect_uri": "",
    "response_type": "code",
    "scope": ""
  }

  key!: string;
  user: User = new User('', '', '', '', '');
  followedUsersTiles: FollowedUserTile[] = [];
  followedUsers!: FollowedUserType[];
  usernameForm!: FormGroup;

  constructor(private channelsService: ChannelsService) {

    this.usernameForm = new FormGroup({
      username: new FormControl()
    });

    channelsService.getAccessToken().subscribe(response => {
      this.key = response.access_token;
    });
  }

  async displayUser() {

    this.channelsService.getUser(this.usernameForm.value.username, this.key).pipe(
      mergeMap((user) => (this.channelsService.getFollowed(user.data[0].id, this.key))
      )).subscribe(response => {
        let calls: Observable<any>[] = [];

        // console.log(response);

        this.user.id = response.data[0].from_id
        this.user.displayName = response.data[0].from_name


        response.data.forEach(followedUser => {
          let call = this.channelsService.getFollowedUser(followedUser.to_name, this.key).pipe(defaultIfEmpty([]));
          // console.log(followedUser.to_id)
          calls.push(call);
        })

        forkJoin(calls).subscribe(results => {
          console.log(results[0]);

          results.forEach(returnedUser => {

            let object: FollowedUserTile= {
              to_login: returnedUser.data[0].login,
              to_name: returnedUser.data[0].display_name,
              imageURL: returnedUser.data[0].profile_image_url
            }


            this.followedUsersTiles.push(object)
          })

        })

      })


  }

  redirect(username: string) {
    // window.location.href=`https://www.twitch.tv/${username}`
    window.open(`https://www.twitch.tv/${username}`, "_blank");
  }

  // async displayUser() {
  //   this.channelsService.getUser(this.usernameForm.value.username, this.key).subscribe(response => {
  //     console.log(response.data[0])
  //     this.user.id = response.data[0].id;

  //     this.channelsService.getFollowed(this.user.id, this.key).subscribe(response => {

  //       this.followedUsers = response.data;

  //       // let calls: Observable<UserResponseType>[] = [];
  //       // response.data.forEach((followed: FollowedUserType) => {
  //       //   // calls.push(this.channelsService.getUser(followed.to_id, this.key))
  //       //   this.followedUsers.push(followed)
  //       // })

  //       // forkJoin(calls).subscribe(responses => {
  //       //   console.log(responses)
  //       // })
  //     });

  //     this.user.displayName = response.data[0].display_name;
  //   });

    // this.channelsService.getUser(this.usernameForm.value.username, this.key).pipe(
    //   mergeMap((responseOne) => {
    //     return zip(of(responseOne), this.channelsService.getFollowed(responseOne.data[0].id, this.key))
    //   })
    // ).pipe(
    //   map((allResponses) => {
    //     let calls: Observable<UserResponseType>[] = [];
    //     allResponses[1].data.forEach((followedUser) => {
    //       console.log(followedUser)
    //       this.channelsService.getFollowedUser(followedUser.to_id, this.key).subscribe(response => console.log(response))
    //       console.log(calls)
    //     })

    //     console.log(calls);

    //     forkJoin(calls).subscribe(responses => {
    //       console.log(responses[0])
    //     })

    //   })
    // ).subscribe(response => {

    // })

    // this.channelsService.getUser(this.usernameForm.value.username, this.key).pipe(
    //   mergeMap((responseOne) => {
    //     return zip(of(responseOne), this.channelsService.getFollowed(responseOne.data[0].id, this.key))
    //   })
    // ).pipe(
    //   mergeMap((allResponses) => {
    //     let calls: Observable<UserResponseType>[] = [];
    //     allResponses[1].data.forEach((followedUser) => {
    //       console.log(followedUser)
    //       this.channelsService.getFollowedUser(followedUser.to_id, this.key).subscribe(response => console.log(response))
    //     })

    //     console.log(calls);

    //     forkJoin(calls).subscribe(responses => {
    //       console.log(responses[0])
    //     })

    //   })
    // ).subscribe(response => {

    // })


    // this.followedUsers.forEach(followedUser => {
    //   console.log(followedUser);
    // })

  }

