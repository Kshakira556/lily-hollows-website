import { useEffect } from "react";

export default function EditRedirect() {
  useEffect(() => {
    window.location.replace("https://lily-hollows.sanity.studio");
  }, []);

  return <p>Redirecting to CMS...</p>;
}