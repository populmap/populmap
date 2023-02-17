import styled from "@emotion/styled";

const SpinnerStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingSpinner = () => {
  return (
    <SpinnerStyle>
      <img
        src="../../../img/titleLogo.ico"
        width={"100px"}
        height={"100px"}
        alt="titleLogo"
      />
      <h3>Loading...</h3>
    </SpinnerStyle>
  );
};

export default LoadingSpinner;
