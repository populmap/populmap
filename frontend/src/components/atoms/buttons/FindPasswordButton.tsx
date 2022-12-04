import { useState } from "react";
import Button from "@mui/material/Button";
import FindPasswordModal from "../modals/FindPasswordModal";

interface FindPasswordButtonProps {
  value: string;
}

const FindPasswordButton = (props: FindPasswordButtonProps): JSX.Element => {
  const { value } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button onClick={(): void => setIsOpen(true)}>{value}</Button>
      {isOpen && <FindPasswordModal setIsOpen={setIsOpen} />}
    </>
  );
};

export default FindPasswordButton;
