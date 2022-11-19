import { Map } from "react-kakao-maps-sdk";
import { PropsWithChildren } from "react";
import { useAppSelector } from "../../redux/hook";

const LoadMap = ({ children }: PropsWithChildren): JSX.Element => {
  const mapState = useAppSelector((state) => state.map);
  return (
    <Map
      center={{
        lat: mapState.center.lat,
        lng: mapState.center.lng,
      }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: "0",
      }}
      level={mapState.level}
    >
      {children}
    </Map>
  );
};

export default LoadMap;
