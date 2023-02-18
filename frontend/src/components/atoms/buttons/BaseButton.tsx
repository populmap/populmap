import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Button } from "@mui/material";
import colorTypes from "../../../types/colorTypes";

const ButtonStyle = styled(Button)`
  padding: 0;
  height: 2rem;

  ${(props) =>
    props.theme === "icon" &&
    css`
      img {
        width: 32px;
        height: 32px;
      }
      svg {
        width: 32px;
        height: 32px;
      }
    `};
  ${(props) =>
    props.theme === "navigate" &&
    css`
      width: 20%;
      font-size: 0.8rem;
    `};
  ${(props) =>
    props.theme === "mapNavigate" &&
    css`
      width: 2.5rem;
      height: 2.5rem;
      svg {
        width: 20px;
        height: 20px;
      }
    `};
  ${(props) =>
    props.theme === "api" &&
    css`
      width: 60%;
      height: 2rem;
    `};
  ${(props) =>
    props.theme === "list" &&
    css`
      width: 25%;
      font-size: 0.5rem;
      color: ${colorTypes.blue};
    `};
  ${(props) =>
    props.theme === "overlay" &&
    css`
      width: 35%;
      font-size: 0.5rem;
      color: ${colorTypes.blue};
    `};
  ${(props) =>
    props.theme === "filter" &&
    css`
      border-radius: 0.5rem;
      width: 4rem;
      height: 1.5rem;
      font-size: 0.5rem;
      color: ${props.color === "primary" ? colorTypes.black : colorTypes.white};
      background-color: ${props.color === "primary"
        ? colorTypes.white
        : colorTypes.blue};
      svg {
        width: 10px;
        height: 10px;
      }
    `};
`;

interface BaseButtonProps {
  theme?: string;
  icon?: JSX.Element;
  color?: "primary" | "secondary";
  variant?: "text" | "outlined" | "contained";
  value?: string;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
}

/**
 * @param props
 * @returns
 */
const BaseButton = (props: BaseButtonProps) => {
  const { theme, icon, color, variant, value, handleClick } = props;

  return (
    <ButtonStyle
      theme={theme}
      color={color}
      variant={variant}
      onClick={handleClick}
    >
      {icon}
      {value}
    </ButtonStyle>
  );
};

export default BaseButton;
