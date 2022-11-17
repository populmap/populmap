import { Map, MapMarker, Circle, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";

const MarkedMap = (): JSX.Element => {
  const [state, setState] = useState({
    center: {
      lat: 37.4882,
      lng: 127.0648,
    },
    errMsg: null,
    isLoading: true,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          // setState((prev) => ({
          //   errMsg: err.message,
          //   isLoading: false,
          // }));
        }
      );
    } else {
      // setState((prev) => ({
      //   ...prev,
      //   errMsg: "geolocation을 사용할수 없어요..",
      //   isLoading: false,
      // }));
    }
  }, []);

  return (
    <Map
      center={state.center}
      style={{
        width: "100%",
        height: "95vh",
        position: "absolute",
        zIndex: "0",
      }}
      level={3}
      onMouseMove={(map, mouseEvent): void => {
        setMousePosition({
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        });
      }}
    >
      {!state.isLoading && (
        <Circle
          center={{
            lat: state.center.lat, // 위도
            lng: state.center.lng, // 경도
          }}
          onMouseover={() => {
            if (!isOpen) setIsOpen(true);
          }}
          onMouseout={() => setIsOpen(false)}
          radius={50}
          strokeWeight={0} // 선의 두께입니다
          strokeColor="#75B8FA" // 선의 색깔입니다
          strokeOpacity={0} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle="dash" // 선의 스타일 입니다
          fillColor="#CFE7FF" // 채우기 색깔입니다
          fillOpacity={0.9} // 채우기 불투명도 입니다
        />
      )}
      {isOpen && (
        <CustomOverlayMap position={mousePosition}>
          <div
            style={{ width: "5rem", height: "5rem", backgroundColor: "white" }}
          >
            hello
          </div>
        </CustomOverlayMap>
      )}
    </Map>
  );
};

export default MarkedMap;
