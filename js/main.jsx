import "../css/main.scss";
import { createRoot } from "react-dom/client";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import Tabs from "./tabs.jsx";
import VimNavigationWidget from "./vimnav.jsx";

// Your existing components
createRoot(document.getElementById("tabs")).render(<Tabs />);

const vimnav = document.createElement("vimnav");
document.body.appendChild(vimnav);
createRoot(vimnav).render(<VimNavigationWidget />);

// SimpleBar component
function ContentSimpleBar({ originalContent }) {
  return (
    <SimpleBar forceVisible="y" style={{ maxHeight: '100%', height: 'calc(100% - 5px)', width: "calc(100% - 15px)", maxWidth: "100%" }}>
      <div dangerouslySetInnerHTML={{ __html: originalContent }} />
    </SimpleBar>
  );
}

// Add SimpleBar to content
const contentElement = document.getElementById("content");
if (contentElement) {
  const originalHTML = contentElement.innerHTML;
  createRoot(contentElement).render(<ContentSimpleBar originalContent={originalHTML} />);
}
