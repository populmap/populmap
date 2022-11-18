import { Map } from "react-kakao-maps-sdk";
import { useAppSelector } from "../../redux/hook";

const LoadMap = (): JSX.Element => {
  const mapState = useAppSelector((state) => state.map);
  console.log(mapState);
  return (
    <Map
      center={{
        lat: mapState.userLat,
        lng: mapState.userLng,
      }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: "0",
      }}
      level={mapState.level}
    />
  );
};

export default LoadMap;
