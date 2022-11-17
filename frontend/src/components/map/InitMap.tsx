import { Map } from "react-kakao-maps-sdk";

const InitMap = (): JSX.Element => {
  return (
    <Map
      center={{ lat: 37.4882, lng: 127.0648 }}
      style={{
        width: "100%",
        height: "95vh",
        position: "absolute",
        zIndex: "0",
      }}
    />
  );
};

export default InitMap;
