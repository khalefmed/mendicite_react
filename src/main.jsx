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
import HomePage from "./routes/home-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/",
        element: <Acceuil />,
      },
      {
        path: "/etablissements",
        element: <Etablissements />,
      },
      {
        path: "/deconnexion",
        element: <Deconnexion />,
      },
    ],
  },
  { path: "/connexion", element: <Connexion /> },
]);

const lang = window.localStorage.getItem("lang");

if(lang){
  i18n.changeLanguage(lang)
}
else {
  window.localStorage.setItem('lang', i18n.language)
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <div
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className={"mainElement " +(i18n.language == "ar" ? "font-arabic" : "font-fr")}
      >
        <RouterProvider router={router} />
      </div>
    </I18nextProvider>
  </React.StrictMode>
);
