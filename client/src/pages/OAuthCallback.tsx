// src/pages/OAuthCallback.tsx
import { useEffect } from "react";

export default function OAuthCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");

    if (window.opener && success) {
      window.opener.postMessage({ success: true }, window.location.origin);
      window.close();
    }
  }, []);

  return <h1>Авторизація...</h1>;
}
