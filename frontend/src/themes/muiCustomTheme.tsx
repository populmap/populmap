import { createTheme } from "@mui/material/styles";

const muiCustomTheme = createTheme({
  typography: {
    fontFamily: ["EliceDigitalBaeum_Regular", "sans-serif"].join(","),
  },
  // 색상 설정 시 생성
  //   palette: {
  //     primary: {
  //       main: "#5657a5",

  //     },
});

export default muiCustomTheme;
