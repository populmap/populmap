import { Controller, Get } from "@nestjs/common";
import { KakaoSearch } from "./kakao.search.component";

@Controller('/api/test')
export class TestController {
  constructor(private kakaoSearch: KakaoSearch) {}
  @Get()
  async test() {
    const result = await this.kakaoSearch.requestSearchByPlace('노원어린이극장');
    console.log(result);
  }
}
