import { Circle } from "react-kakao-maps-sdk";

interface UserMarkerProps {
  center: {
    lat: number;
    lng: number;
  };
}

const UserMarker = (props: UserMarkerProps): JSX.Element => {
  const { center } = props;
  return (
    <Circle
      center={center}
      radius={10}
      strokeWeight={0.5} // 선의 두께입니다
      strokeColor="red" // 선의 색깔입니다
      strokeOpacity={2} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      fillColor="red" // 채우기 색깔입니다
      fillOpacity={0.7} // 채우기 불투명도 입니다
    />
  );
};

export default UserMarker;
