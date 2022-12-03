export interface IAreaMap {
  place: string;
  keyword: string;
}

export interface IAreaList {
  [key: string]: IAreaMap[];
}

// constant for area list
export const AreaList: IAreaList = {
  '고궁·문화유산': [
    {
      place: '경복궁·서촌마을',
      keyword: '경복궁·서촌마을',
    },
    {
      place: '광화문·덕수궁',
      keyword: '광화문·덕수궁',
    },
    {
      place: '창덕궁·종묘',
      keyword: '창덕궁·종묘',
    },
  ],
  관광특구: [
    {
      place: '강남 MICE 관광특구',
      keyword: '코엑스',
    },
    {
      place: '명동 관광특구',
      keyword: '명동',
    },
    {
      place: '잠실 관광특구',
      keyword: '잠실',
    },
    {
      place: '홍대 관광특구',
      keyword: '홍대',
    },
    {
      place: '동대문 관광특구',
      keyword: '동대문',
    },
    {
      place: '이태원 관광특구',
      keyword: '이태원',
    },
    {
      place: '종로·청계 관광특구',
      keyword: '종로',
    },
  ],
  공원: [
    {
      place: '국립중앙박물관·용산가족공원',
      keyword: '국립중앙박물관·용산가족공원',
    },
    {
      place: '뚝섬한강공원',
      keyword: '뚝섬한강공원',
    },
    {
      place: '반포한강공원',
      keyword: '반포한강공원',
    },
    {
      place: '서울대공원',
      keyword: '서울대공원',
    },
    {
      place: '월드컵공원',
      keyword: '월드컵공원',
    },
    {
      place: '잠실종합운동장',
      keyword: '잠실종합운동장',
    },
    {
      place: '남산공원',
      keyword: '남산공원',
    },
    {
      place: '망원한강공원',
      keyword: '망원한강공원',
    },
    {
      place: '북서울꿈의숲',
      keyword: '북서울꿈의숲',
    },
    {
      place: '서울숲공원',
      keyword: '서울숲공원',
    },
    {
      place: '이촌한강공원',
      keyword: '이촌한강공원',
    },
    {
      place: '잠실한강공원',
      keyword: '잠실한강공원',
    },
  ],
  발달상권: [
    {
      place: '가로수길',
      keyword: '가로수길',
    },
    {
      place: '노량진',
      keyword: '노량진',
    },
    {
      place: '성수카페거리',
      keyword: '성수역',
    },
    {
      place: '쌍문동 맛집거리',
      keyword: '쌍문역',
    },
    {
      place: '여의도',
      keyword: '여의도',
    },
    {
      place: '인사동·익선동',
      keyword: '인사동·익선동',
    },
    {
      place: 'DMC(디지털미디어시티)',
      keyword: '디지털미디어시티',
    },
    {
      place: '낙산공원·이화마을',
      keyword: '낙산공원·이화마을',
    },
    {
      place: '북촌한옥마을',
      keyword: '북촌한옥마을',
    },
    {
      place: '수유리 먹자골목',
      keyword: '수유리 먹자골목',
    },
    {
      place: '압구정로데오거리',
      keyword: '압구정로데오거리',
    },
    {
      place: '영등포 타임스퀘어',
      keyword: '영등포 타임스퀘어',
    },
    {
      place: '창동 신경제 중심지',
      keyword: '창동교',
    },
  ],
  인구밀집지역: [
    {
      place: '가산디지털단지역',
      keyword: '가산디지털단지역',
    },
    {
      place: '건대입구역',
      keyword: '건대입구역',
    },
    {
      place: '교대역',
      keyword: '교대역',
    },
    {
      place: '서울역',
      keyword: '서울역',
    },
    {
      place: '신도림역',
      keyword: '신도림역',
    },
    {
      place: '신촌·이대역',
      keyword: '신촌·이대역',
    },
    {
      place: '역삼역',
      keyword: '역삼역',
    },
    {
      place: '용산역',
      keyword: '용산역',
    },
    {
      place: '강남역',
      keyword: '강남역',
    },
    {
      place: '고속터미널역',
      keyword: '고속터미널역',
    },
    {
      place: '구로디지털단지역',
      keyword: '구로디지털단지역',
    },
    {
      place: '선릉역',
      keyword: '선릉역',
    },
    {
      place: '신림역',
      keyword: '신림역',
    },
    {
      place: '왕십리역',
      keyword: '왕십리역',
    },
    {
      place: '연신내역',
      keyword: '연신내역',
    },
  ],
};
