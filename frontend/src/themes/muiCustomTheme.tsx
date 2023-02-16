import { createTheme } from "@mui/material/styles";

const muiCustomTheme = createTheme({
  typography: {
    fontFamily: ["EliceDigitalBaeum_Regular", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#0080fd",
    },
    secondary: {
      main: "#000000",
    },
  },
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         color: "black",
  //         textTransform: "unset",
  //         minWidth: 0,
  //       },
  //     },
  //   },
  //   MuiSvgIcon: {
  //     styleOverrides: {
  //       root: {
  //         color: "black",
  //         fontSize: "1.2rem",
  //       },
  //     },
  //   },
  // },
});

export default muiCustomTheme;
