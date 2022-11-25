import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

interface PageNavigateButtonProps {
  text: string;
  route: string;
}

const PageNavigateButton = (props: PageNavigateButtonProps): JSX.Element => {
  const navigate = useNavigate();
  const { text, route } = props;
  const handleClick = (): void => {
    navigate(`${route}`);
  };

  return <Button onClick={handleClick}>{text}</Button>;
};

export default PageNavigateButton;
