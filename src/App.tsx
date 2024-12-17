import { useEffect, useState } from "react";

const App2 = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const iframe = window.document.getElementById("auth") as HTMLIFrameElement;

    iframe.onload = () => {
      console.log("Iframe loaded, sending message...");
      iframe?.contentWindow?.postMessage(
        { action: "requestToken" },
        "*" // Wildcard origin, you can change to http://localhost:5173
      );
    };

    const receiveToken = (event: MessageEvent) => {
      if (event.data.action === "sendToken" && event.data.token) {
        console.log("Token received:", event.data.token);
        setToken(event.data.token);
      }
    };

    window.addEventListener("message", receiveToken, false);

    return () => {
      window.removeEventListener("message", receiveToken);
    };
  }, []);

  return (
    <div>
      <iframe
        style={{ display: "none" }}
        id="auth"
        src="https://account-dev.bizgem.io/"
      ></iframe>
      <h1>App 2</h1>
      {token ? (
        <p>Token received: {token}</p>
      ) : (
        <p>Requesting token from App 1...</p>
      )}
    </div>
  );
};

export default App2;
