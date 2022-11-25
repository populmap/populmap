import { MapMarker, useMap } from "react-kakao-maps-sdk";
import { useState } from "react";

// density.dto
// interface DensityMarkerProps {
// }

const DensityMarker = (): JSX.Element => {
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MapMarker
      position={{
        lat: 37.4882,
        lng: 127.0648,
      }}
      onClick={(marker) => {
        map.panTo(marker.getPosition());
        setIsVisible(false);
      }}
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
    >
      {isVisible && (
        <div>
          <span>Density marker</span>
        </div>
      )}
    </MapMarker>
  );
};

export default DensityMarker;
