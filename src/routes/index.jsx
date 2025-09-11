import React from 'react'
import Acceuil from './acceuil';
import AcceuilEtablissement from './acceuil_etablissement';

export const Index = () => {

    return (
        <div>
            {(role != "Agent Trésor" && role != "Administrateur") ? <AcceuilEtablissement/> : <Acceuil/>}
            
        </div>
    )
}
