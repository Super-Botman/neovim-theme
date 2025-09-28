import { useState, useRef, useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";

function useDoubleKeyPress(key, callback, delay = 300) {
  const pressCount = useRef(0);
  const timeoutRef = useRef(null);

  const handleKeyPress = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    pressCount.current += 1;

    if (pressCount.current === 2) {
      callback();
      pressCount.current = 0;
      return;
    }

    timeoutRef.current = setTimeout(() => {
      pressCount.current = 0;
    }, delay);
  }, [callback, delay]);

  useHotkeys(key, handleKeyPress);
}

export function vimNavigation(containerSelector = "div.focusable") {
  const [focusIndex, setFocusIndex] = useState(0);
  const scrollAmount = 60;

  function getDivs() {
    return Array.from(document.querySelectorAll(containerSelector));
  }

  function getFocusedDiv() {
    const divs = getDivs();
    return divs[focusIndex] || null;
  }

  useHotkeys("j", () => {
    const el = getFocusedDiv();
    if (el) el.scrollBy?.({ top: scrollAmount, behavior: "smooth" });
  });

  useHotkeys("k", () => {
    const el = getFocusedDiv();
    if (el) el.scrollBy?.({ top: -scrollAmount, behavior: "smooth" });
  });

  useDoubleKeyPress("g", () => {
    const el = getFocusedDiv();
    console.log(el)
    if (el) el.scrollTo?.({ top: 0, behavior: "smooth" });
  }, 300);

  useHotkeys("shift+g", () => {
    const el = getFocusedDiv();
    if (el) el.scrollTo?.({ top: el.scrollHeight, behavior: "smooth" });
  });

  useHotkeys("esc", (e) => {
    e.preventDefault();
    const el = document.getElementById("terminal");
    if (el) el.focus();
  })

  useDoubleKeyPress("f", () => {
    const el = document.getElementById("files-wrapper");
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
    el.focus();
  }, 300)

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
