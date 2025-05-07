import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator } from '@aws-amplify/ui-react';


import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PolitiqueConfidentialite from "./pages/Confidentialite.tsx";
import "./index.css";
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  
  <React.StrictMode>

    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/politique-confidentialite">Politique Confidentialité</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={
             <Authenticator><App /></Authenticator>} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite/>} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);
