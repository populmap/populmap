import styled from "@emotion/styled";
import { Button } from "@mui/material";

const ButtonStyle = styled(Button)`
  width: 60%;
`;

interface BaseButtonProps {
  value: string | any;
  handleClick: () => void;
}

/**
 * @param props
 * @returns
 */
const BaseButton = (props: BaseButtonProps) => {
  const { value, handleClick } = props;

  return (
    <ButtonStyle variant={"contained"} onClick={handleClick}>
      {value}
    </ButtonStyle>
  );
};

export default BaseButton;
