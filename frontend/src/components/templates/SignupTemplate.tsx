import styled from "@emotion/styled";
import SignupForm from "../organisms/SignupForm";

const SignupSection = styled.section`
  position: absolute;
  text-align: center;
  top: 10%;
  width: 100%;
  background-color: #fafafa;
`;

const SignupTemplate = (): JSX.Element => {
  return (
    <SignupSection>
      <SignupForm />
    </SignupSection>
  );
};

export default SignupTemplate;
