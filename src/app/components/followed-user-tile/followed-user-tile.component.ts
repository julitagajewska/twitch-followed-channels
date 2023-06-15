import { Component, Input, OnInit } from '@angular/core';
import { FollowedUserResponseType, FollowedUserType } from 'src/app/model/FollowedUser';
import { FollowedUserTile } from 'src/app/model/FollowedUserTile';
import { ChannelsService } from 'src/app/services/channels.service';

@Component({
  selector: 'app-followed-user-tile',
  templateUrl: './followed-user-tile.component.html',
  styleUrls: ['./followed-user-tile.component.css']
})
export class FollowedUserTileComponent implements OnInit {

  @Input() followedUser!: FollowedUserTile;
  displayUser!: FollowedUserTile;

  constructor(private channelsService: ChannelsService) {
  }

  ngOnInit(): void {
  }

}
