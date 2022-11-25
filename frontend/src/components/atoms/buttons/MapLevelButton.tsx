import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../redux/hook";
import { mapLevelUp, mapLevelDown } from "../../../redux/slices/mapSlice";

interface MapLevelButtonProps {
  type: string;
}

const MapLevelButton = (props: MapLevelButtonProps): JSX.Element => {
  const { type } = props;
  const dispatch = useAppDispatch();
  const handleClick = (): void => {
    if (type === "up") dispatch(mapLevelUp());
    else dispatch(mapLevelDown());
  };

  return (
    <Button
      style={{
        height: "2rem",
        width: "2rem",
        backgroundColor: "#fff",
        color: "#0000008A",
      }}
      onClick={handleClick}
    >
      {type === "up" ? <AddIcon /> : <RemoveIcon />}
    </Button>
  );
};

export default MapLevelButton;
