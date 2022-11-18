import { Map } from "react-kakao-maps-sdk";

const LoadMap = (): JSX.Element => {
  return (
    <Map
      center={{
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: "0",
      }}
      level={3}
    />
  );
};

export default LoadMap;
