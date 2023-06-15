import { FollowedUserTile } from "./FollowedUserTile"
import { UserType } from "./UserType"

export type ResultType = {
  user: UserType,
  followedUsersTiles: FollowedUserTile[]
}
