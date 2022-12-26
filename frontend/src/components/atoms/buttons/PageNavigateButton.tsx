import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

interface PageNavigateButtonProps {
  value: string;
  route: string;
  style?: object;
}

const PageNavigateButton = (props: PageNavigateButtonProps): JSX.Element => {
  const navigate = useNavigate();
  const { value, route, style } = props;
  const handleClick = (): void => {
    navigate(`${route}`);
  };

  return (
    <Button style={style} onClick={handleClick}>
      {value}
    </Button>
  );
};

PageNavigateButton.defaultProps = {
  style: {
    fontSize: "0.5rem",
    height: "1.5rem",
    width: "5rem",
    color: "black",
  },
};

export default PageNavigateButton;
