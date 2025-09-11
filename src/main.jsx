import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import "./index.css";
import Acceuil from "./routes/acceuil";
import Etablissements from "./routes/etablissements";
import Deconnexion from "./routes/deconnexion";
import Connexion from "./routes/connexion";
import HomePage from "./routes/app";
import { ModifierEtablissement } from "./routes/modifier_etablissement";
import Banques from "./routes/banques";
import Salaries from "./routes/salaries";
import Cheques from "./routes/cheques";
import Utilisateurs from "./routes/utilisateurs";
import { CreerEtablissement } from "./routes/creer_etablissement";
import { CreerBanque } from "./routes/creer_banque";
import { CreerCheque } from "./routes/creer_cheque";
import { CreerUtilisateur } from "./routes/creer_utilisateur";
import { CreerSalarie } from "./routes/creer_salarie";
import { ModifierBanque } from "./routes/modifier_banque";
import { ModifierCheque } from "./routes/modifier_cheque";
import { ModifierSalarie } from "./routes/modifier_salarie";
import { MotDePasse } from "./routes/mot_de_passe";
import { Profil } from "./routes/profil";
import { Index } from "./routes";
import Etats from "./routes/etats";
import EtatsEtablissement from "./routes/etats_etablissement";
import { CreerEtat } from "./routes/creer_etat";
import { EtatDetails } from "./routes/etat_detail";
import '@radix-ui/themes/styles.css';
import { Theme } from "@radix-ui/themes";
import { ModifierInformations } from "./routes/modifier_utilisateur";
import ProtectedRoute from "./lib/auth";



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage component={Banques} />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute component={Banques} />,
      },
      {
        path: "/deconnexion",
        element: <Deconnexion />,
      },
    ],
  },
  { path: "/connexion", element: <Connexion /> },
]);

// const lang = window.localStorage.getItem("lang");

// if(lang){
//   i18n.changeLanguage(lang)
// }
// else {
//   window.localStorage.setItem('lang', i18n.language)
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <div
        dir='rtl'
        className={"mainElement font-ar"}
      >
        <Theme>
          <RouterProvider router={router} />
        </Theme>
        
      </div>
    </I18nextProvider>
  </React.StrictMode>
);
