import styled from "@emotion/styled";
import ChangePasswordForm from "../organisms/ChangePasswordForm";

const ChangePasswordSectionStyle = styled.section`
  padding-top: 4rem;
`;

const ChangePasswordTemplate = (): JSX.Element => {
  return (
    <ChangePasswordSectionStyle>
      <ChangePasswordForm />
    </ChangePasswordSectionStyle>
  );
};

export default ChangePasswordTemplate;
