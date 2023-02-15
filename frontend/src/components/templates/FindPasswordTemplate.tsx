import styled from "@emotion/styled";
import FindPasswordForm from "../organisms/FindPasswordForm";

const FindPasswordSectionStyle = styled.section`
  padding-top: 4rem;
`;

const FindPasswordTemplate = (): JSX.Element => {
  return (
    <FindPasswordSectionStyle>
      <FindPasswordForm />
    </FindPasswordSectionStyle>
  );
};

export default FindPasswordTemplate;
