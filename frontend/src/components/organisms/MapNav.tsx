import styled from "@emotion/styled";
import MyLocationButton from "../atoms/buttons/MyLocationButton";
import MapLevelButton from "../atoms/buttons/MapLevelButton";

const MapSection = styled.div`
  display: flex;
  flex-direction: column;
  touch-action: none;
`;

const MapNav = (): JSX.Element => {
  return (
    <MapSection>
      <MyLocationButton />
      <MapLevelButton type="up" />
      <MapLevelButton type="down" />
    </MapSection>
  );
};

export default MapNav;
