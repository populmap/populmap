export class UserDto {
  user_id: number; // 카카오에서 제공해준 user_id
  nickname: string; // 유저의 닉네임
  profile_url?: string; // 카카오 프사 url
  email?: string; // 카카오 등록 email
}
