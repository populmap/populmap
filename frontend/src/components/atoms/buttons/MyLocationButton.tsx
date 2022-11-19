import MyLocationIcon from "@mui/icons-material/MyLocation";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../redux/hook";
import {
  mapGeolocationDetect,
  mapLevelSelect,
} from "../../../redux/slices/mapSlice";

const MyLocationButton = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const handleClick = (): void => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(
        mapGeolocationDetect({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
      dispatch(mapLevelSelect(3));
    });
  };
  return (
    <Button onClick={handleClick}>
      <MyLocationIcon />
    </Button>
  );
};

export default MyLocationButton;
