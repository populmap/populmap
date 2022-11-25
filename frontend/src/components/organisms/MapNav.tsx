import styled from "@emotion/styled";
import MyLocationButton from "../atoms/buttons/MyLocationButton";
import MapLevelButton from "../atoms/buttons/MapLevelButton";

const MapSection = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 5%;
  left: 5%;
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
