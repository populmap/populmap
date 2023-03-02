<div align="center">

![titleLogo](https://user-images.githubusercontent.com/46778769/222502760-40c319de-459d-4aa5-a8b8-3a04762c6687.png)


[![GitHub Stars](https://img.shields.io/github/stars/populmap/populmap?style=for-the-badge)](https://github.com/populmap/populmap/stargazers)
[![GitHub Stars](https://img.shields.io/github/issues/populmap/populmap?style=for-the-badge)](https://github.com/populmap/populmap/issues)
[![GitHub License](https://img.shields.io/github/license/populmap/populmap?style=for-the-badge)](https://github.com/IgorAntun/node-chat/issues)

# 서울시 실시간 인구 복잡도, 도로 현황과 전국의 행사 정보를 제공하는 지도 서비스

</div>

## Description

- 2022년 10월 경에 발생했던 이태원 참사를 겪으면서, 인구와 도로 현황을 간편하게 확인할 수 있는 서비스를 개발하여 안전사고 예방에 도움이 되고자 `populmap`을 기획하게되었습니다.
- 서비스에 사용되는 데이터는 [공공테이터포털](https://www.data.go.kr/)에서 `서울시 주요 50개 장소의 실시간 데이터`와 `전국의 행사 정보`를 가공해 활용합니다.

## Table of Contents

- [Usage](#usage)
- [Structure](#structure)
- [Skills](#skills)
- [Features](#features)
- [Credits](#credits)

<!-- AWS 크레딧 종료 이후에 local 환경에서 접속하는 Usage 방법에 대해 작성해야합니다. -->

## Usage
### Website
- https://populmap.site/
### API
- https://populmap.site/docs


### 기능 안내

<table>
<tr>
<th> 인구 복잡도 </th>
<th> 행사 </th>
</tr>
<tr>
<td>

![people](https://user-images.githubusercontent.com/46778769/222501876-a2cc4ff5-2a09-495a-96bb-e17298fc4ce5.gif)


</td>
<td>

![event](https://user-images.githubusercontent.com/46778769/222505919-e283cff0-3421-4546-911a-e14c73314acd.gif)

</td>
</tr>
</table>

<table>
<tr>
<th> 지역 / 진행상태 분류 </th>
<th> 필터 </th>
</tr>
<tr>
<td>

![category](https://user-images.githubusercontent.com/46778769/222507737-1be3ca75-6804-432f-a853-1512da3b2d37.gif)

</td>
<td>

![filter](https://user-images.githubusercontent.com/46778769/222507794-a654356a-eea6-41a4-8400-ce46a03497b3.gif)

</td>
</tr>
</table>

<table>
<tr>
<th> 행사 / 북마크 리스트 </th>
<th> 북마크 추가 / 제거 </th>
</tr>
<tr>
<td>

![eventList](https://user-images.githubusercontent.com/46778769/222508005-a0a5baac-5d13-4e50-ad06-eb972df7714f.gif)

</td>
<td>

![detailAndAddBookmark](https://user-images.githubusercontent.com/46778769/222512740-0ada5d83-aeab-4e0b-9419-e950b8aa7944.gif)


</td>
</tr>
</table>

## Structure
<img width="1206" alt="image" src="https://user-images.githubusercontent.com/46778769/222497021-017c02c0-21d7-4ee1-b8e7-ef66b5d067d5.png">

## Skills
<!-- 백엔드 사용 스택 작성해주시면 됩니다. -->
### Backend

<div>
   <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
</div>

### Frontend

<div>
   <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
   <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
   <img src="https://img.shields.io/badge/redux-764abc?style=flat-square&logo=redux&logoColor=white"/>
   <img src="https://img.shields.io/badge/Material UI-017ffe?style=flat-square&logo=mui&logoColor=white"/>
   <img src="https://img.shields.io/badge/styled components/Emotion-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
</div>

### Common

<div>
   <img src="https://img.shields.io/badge/Jira-2684ff?style=flat-square&logo=Jira&logoColor=white"/>
   <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>
   <img src="https://img.shields.io/badge/Slack-481449?style=flat-square&logo=Slack&logoColor=white"/>
   <img src="https://img.shields.io/badge/Notion-181717?style=flat-square&logo=Notion&logoColor=white"/>
   <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/>
</div>

## Features
- `인구 복잡도`와 `도로 상태`를 실시간으로 확인할 수 있습니다.
- 장소 검색 시 지도에서 해당 위치로 이동됩니다.
- 전국의 행사 정보를`지역`과 `진행 상태`에 따라 분류할 수 있습니다.
- 사이트 로그인과 OAuth(구글, 네이버, 카카오) 로그인할 수 있습니다.
- 로그인이 된 유저는 행사에 대해 `북마크` 추가가 가능합니다.

## Credits
<table>
<tr>
<th> Frontend </th>
<th> Backend </th>
</tr>
<tr>
<td>

[@aseungbo](https://github.com/aseungbo)

</td>
<td>

[@sichoi42](https://github.com/sichoi42)

</td>
</tr>
</table>

<table>
<tr>
<th> Thanks to </th>
<tr>
<td>

[AWS credit](https://42seoul.kr/seoul42/main/view)

[react-kakao-maps-sdk](https://github.com/JaeSeoKim/react-kakao-maps-sdk)
</td>
</table>
