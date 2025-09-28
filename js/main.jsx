import "../css/main.scss";
import { createRoot } from "react-dom/client";
import Tabs from "./tabs.jsx";
import VimNavigationWidget from "./vimnav.jsx"; "./vimnav.jsx";


createRoot(document.getElementById("tabs")).render(<Tabs />);

const vimnav = document.createElement("vimnav");
document.body.appendChild(vimnav);
createRoot(vimnav).render(<VimNavigationWidget />);
