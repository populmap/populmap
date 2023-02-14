import styled from "@emotion/styled";
import SignupForm from "../organisms/SignupForm";

const SignupSectionStyle = styled.section`
  padding-top: 4rem;
`;

const SignupTemplate = (): JSX.Element => {
  return (
    <SignupSectionStyle>
      <SignupForm />
    </SignupSectionStyle>
  );
};

export default SignupTemplate;
