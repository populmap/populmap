import { createTheme } from "@mui/material/styles";

const muiCustomTheme = createTheme({
  typography: {
    fontFamily: ["EliceDigitalBaeum_Regular", "sans-serif"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "black",
          textTransform: "unset",
          minWidth: 0,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "gray",
          fontSize: "1.2rem",
        },
      },
    },
  },
});

export default muiCustomTheme;
