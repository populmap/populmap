import styled from "@emotion/styled";
import ChangePasswordForm from "../organisms/ChangePasswordForm";

const ChangePasswordSection = styled.section`
  position: absolute;
  text-align: center;
  top: 5%;
  width: 100%;
  height: 95%;
  background-color: #fafafa;
`;

const ChangePasswordTemplate = (): JSX.Element => {
  return (
    <ChangePasswordSection>
      <ChangePasswordForm />
    </ChangePasswordSection>
  );
};

export default ChangePasswordTemplate;
