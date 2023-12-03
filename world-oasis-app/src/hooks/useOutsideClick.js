import { useEffect, useRef } from "react";

export function useOutsideClick(action, onListenCapture = true) {
  const ref = useRef();

  useEffect(() => {
    function captureClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        action();
      }
    }
    document.addEventListener("click", captureClick, onListenCapture);
    return () =>
      document.removeEventListener("click", captureClick, onListenCapture);
  }, [action, onListenCapture]);

  return ref;
}
