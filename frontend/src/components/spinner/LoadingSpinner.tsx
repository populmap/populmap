import styled from "@emotion/styled";

const SpinnerStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingSpinner = () => {
  return <SpinnerStyle>Loading Spinner</SpinnerStyle>;
};

export default LoadingSpinner;
