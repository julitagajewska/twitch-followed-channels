export type FollowedUserType = {
  from_id: string
  from_login: string
  from_name: string
  to_id: string
  to_name: string
  followed_at: string
}

export type FollowedUserResponseType = {
  data: FollowedUserType[]
}
