import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ExternalRedirect({ baseUrl }) {
  const { reference } = useParams();

  useEffect(() => {
    if (reference) {
      window.location.href = `${baseUrl}?retrieval_reference_number=${reference}`;
    }
  }, [reference, baseUrl]);

  return null;
}

export default ExternalRedirect;