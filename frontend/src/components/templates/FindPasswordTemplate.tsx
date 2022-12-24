import styled from "@emotion/styled";
import FindPasswordForm from "../organisms/FindPasswordForm";

const FindPasswordSection = styled.section`
  position: absolute;
  text-align: center;
  top: 5%;
  width: 100%;
  height: 95%;
`;

const FindPasswordTemplate = (): JSX.Element => {
  return (
    <FindPasswordSection>
      <FindPasswordForm />
    </FindPasswordSection>
  );
};

export default FindPasswordTemplate;
