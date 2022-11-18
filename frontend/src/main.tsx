import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import muiCustomTheme from "./themes/muiCustomTheme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={muiCustomTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
