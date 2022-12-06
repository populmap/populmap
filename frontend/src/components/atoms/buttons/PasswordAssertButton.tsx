import Button from "@mui/material/Button";
import { SetStateAction, Dispatch, useState } from "react";

import { axiosAuthPasswordAssert } from "../../../network/axios/axios.auth";

interface PasswordAssertButtonProps {
  password: string;
  value: string;
  style?: object;
  setIsAssert: Dispatch<SetStateAction<boolean>>;
}

const PasswordAssertButton = (
  props: PasswordAssertButtonProps
): JSX.Element => {
  const { password, value, style, setIsAssert } = props;
  const [isFail, setIsFail] = useState<boolean>(false);

  const handleClick = (): void => {
    if (password !== "") {
      axiosAuthPasswordAssert({ password })
        .then((response) => {
          setIsAssert(true);
          console.log(response);
        })

        .catch((error: any) => {
          setIsFail(true);
          console.error(error);
        });
    }
  };

  return (
    <>
      {isFail && (
        <p style={{ fontSize: "0.7rem", color: "red" }}>
          {" "}
          비밀번호가 일치하지 않습니다.{" "}
        </p>
      )}
      <Button style={style} onClick={handleClick}>
        {value}
      </Button>
    </>
  );
};

PasswordAssertButton.defaultProps = {
  style: {
    backgroundColor: "#1976d2",
    width: "60%",
  },
};

export default PasswordAssertButton;
