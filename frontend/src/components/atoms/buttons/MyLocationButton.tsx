import MyLocationIcon from "@mui/icons-material/MyLocation";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../redux/hook";
import {
  mapLocationChange,
  mapLevelSelect,
} from "../../../redux/slices/mapSlice";

const MyLocationButton = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const handleClick = (): void => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(mapLevelSelect(3));
      dispatch(
        mapLocationChange({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
    });
  };
  return (
    <Button
      style={{
        borderRadius: "1rem",
        height: "2rem",
        width: "2rem",
        backgroundColor: "#fff",
        color: "#0000008A",
        marginBottom: "0.5rem",
      }}
      onClick={handleClick}
    >
      <MyLocationIcon style={{ height: "1rem" }} />
    </Button>
  );
};

export default MyLocationButton;
