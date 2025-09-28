import { useState, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";


export function vimNavigation(containerSelector = "div.focusable") {
  const [focusIndex, setFocusIndex] = useState(0);
  const scrollAmount = 60;

  function getDivs() {
    return Array.from(document.querySelectorAll(containerSelector));
  }

  function getFocusedDiv() {
    const divs = getDivs();
    console.log(divs)
    return divs[focusIndex] || null;
  }

  useHotkeys("j", () => {
    const el = getFocusedDiv();
    if (el) el.scrollBy?.({ top: scrollAmount, behavior: "smooth" });
  }, [focusIndex]);

  useHotkeys("k", () => {
    const el = getFocusedDiv();
    if (el) el.scrollBy?.({ top: -scrollAmount, behavior: "smooth" });
  }, [focusIndex]);

  useHotkeys("g, g", () => {
    const el = getFocusedDiv();
    if (el) el.scrollTo?.({ top: 0, behavior: "smooth" });
  }, [focusIndex]);

  useHotkeys("shift+g", () => {
    const el = getFocusedDiv();
    if (el) el.scrollTo?.({ top: el.scrollHeight, behavior: "smooth" });
  }, [focusIndex]);

  useHotkeys("tab", (e) => {
    e.preventDefault();
    const divs = getDivs();
    if (divs.length === 0) return;

    const nextIndex = (focusIndex + 1) % divs.length;
    setFocusIndex(nextIndex);
    divs[nextIndex].focus();
  }, [focusIndex]);
}


export default function VimNavigationWidget() {
  vimNavigation();
  return null;
}
