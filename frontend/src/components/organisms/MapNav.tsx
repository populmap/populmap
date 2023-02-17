import styled from "@emotion/styled";
import { useCallback } from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import BaseButton from "../atoms/buttons/BaseButton";
import { useAppDispatch } from "../../redux/hook";
import {
  mapLevelSelect,
  mapLevelUp,
  mapLevelDown,
  mapLocationChange,
} from "../../redux/slices/mapSlice";
import colorTypes from "../../types/colorTypes";

const MapSection = styled.div`
  display: flex;
  flex-direction: column;
  touch-action: none;
  border-radius: 0.7rem;
  background-color: ${colorTypes.white};
`;

const MapNav = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const handleLocation = useCallback((): void => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(mapLevelSelect(3));
      dispatch(
        mapLocationChange({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
    });
  }, []);

  return (
    <MapSection>
      <BaseButton
        theme={"mapNavigate"}
        icon={<MyLocationIcon />}
        handleClick={handleLocation}
      />
      <BaseButton
        theme={"mapNavigate"}
        icon={<AddIcon />}
        handleClick={() => dispatch(mapLevelUp())}
      />
      <BaseButton
        theme={"mapNavigate"}
        icon={<RemoveIcon />}
        handleClick={() => {
          dispatch(mapLevelDown());
        }}
      />
    </MapSection>
  );
};

export default MapNav;
