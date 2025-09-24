import "../sass/main.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Tabs from "./tabs.jsx";

const root = createRoot(document.getElementById("tabs"));
root.render(
  <StrictMode>
    <Tabs />
  </StrictMode>,
);
