import { Map, MapMarker } from "react-kakao-maps-sdk";
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
          //   setState((prev) => ({
          //     ...prev,
          //     errMsg: err.message,
          //     isLoading: false,
          //   }));
        }
      );
    } else {
      //   setState((prev) => ({
      //     ...prev,
      //     errMsg: "geolocation을 사용할수 없어요..",
      //     isLoading: false,
      //   }));
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
    >
      {!state.isLoading && (
        <MapMarker position={state.center}>
          <div style={{ padding: "0.5rem", color: "#000" }}>
            {state.errMsg ? state.errMsg : "여기에 계신가요?!"}
          </div>
        </MapMarker>
      )}
    </Map>
  );
};

export default MarkedMap;
