import { Global, css } from "@emotion/react";

const style = css`
  @font-face {
    font-family: "EliceDigitalBaeum_Regular";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/EliceDigitalBaeum_Regular.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  html {
    max-width: 30rem;
    margin: auto;
  }
  body {
    margin: 0;
    max-height: 60rem;
    font-family: "EliceDigitalBaeum_Regular";
    -webkit-text-size-adjust: none;
    -ms-text-size-adjust: none;
    -moz-text-size-adjust: none;
  }

  input,
  button,
  select,
  option {
    font-family: inherit;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    outline-style: none;
  }
`;

export default function GlobalStyle(): JSX.Element {
  return <Global styles={style} />;
}
