import React from "react";
import { useParams } from "react-router-dom";

const EtablissementDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Détails de l'établissement</h1>
      <p>ID: {id}</p>
      {/* Add your logic to fetch and display the establishment details using the ID */}
    </div>
  );
};

export default EtablissementDetails;