import Button from "@mui/material/Button";

interface CallButtonProps {
  value: string;
  call: string;
  style?: object;
}

const CallButton = (props: CallButtonProps): JSX.Element => {
  const { value, call, style } = props;
  return (
    <Button href={`tel:${call}`} style={style}>
      {value}
    </Button>
  );
};

CallButton.defaultProps = {
  style: {},
};

export default CallButton;
