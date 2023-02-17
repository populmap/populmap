import { createTheme } from "@mui/material/styles";
import colorTypes from "../types/colorTypes";

const muiCustomTheme = createTheme({
  typography: {
    fontFamily: ["EliceDigitalBaeum_Regular", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: colorTypes.black,
    },
    secondary: {
      main: colorTypes.blue,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 0,
        },
      },
    },
  },
});

export default muiCustomTheme;
