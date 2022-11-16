import styled from "@emotion/styled";

interface FindUserInfoButtonProps {
  type: string;
}

const Button = styled.button`
  border: 0;
  background-color: transparent;
`;

// TODO: 계정 찾기와 비밀번호 찾기의 경우 각각 modal을 띄워줘야합니다.
const FindUserInfoButton = (props: FindUserInfoButtonProps): JSX.Element => {
  const { type } = props;
  return type === "id" ? (
    <Button>계정 찾기</Button>
  ) : (
    <Button>비밀번호 찾기</Button>
  );
};

export default FindUserInfoButton;
