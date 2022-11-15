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
    max-height: 60rem;
  }
  body {
    height: 100vh;
    font-family: "EliceDigitalBaeum_Regular";
  }
`;

export default function GlobalStyle(): JSX.Element {
  return <Global styles={style} />;
}
