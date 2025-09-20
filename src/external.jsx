import { useEffect } from "react";

function ExternalRoute({ url }) {
  useEffect(() => {
    window.location.href = url; // full page redirect
  }, [url]);

  return null; // nothing to render
}


export default ExternalRoute;