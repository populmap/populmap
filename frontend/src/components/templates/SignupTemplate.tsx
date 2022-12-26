import styled from "@emotion/styled";
import SignupForm from "../organisms/SignupForm";

const SignupSection = styled.section`
  position: absolute;
  text-align: center;
  top: 5%;
  width: 100%;
  height: 90%;
`;

const SignupTemplate = (): JSX.Element => {
  return (
    <SignupSection>
      <SignupForm />
    </SignupSection>
  );
};

export default SignupTemplate;
