import { useEffect } from "react";

export const usePostMessageListener = (origin, onMessage) => {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin === origin) {
        onMessage(event.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [origin, onMessage]);
};
