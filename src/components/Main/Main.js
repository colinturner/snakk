import React from "react";
import { Route, HashRouter } from "react-router-dom";
import VerbsPage from "../pages/VerbsPage/VerbsPage";
import AdditionalResourcesPage from "../pages/AdditionalResourcesPage/AdditionalResourcesPage";
import SnakkNavbar from "../SnakkNavbar/SnakkNavbar";

function Main() {
  return (
    <HashRouter>
      <SnakkNavbar />
      <Route path="/learn" component={VerbsPage} />
      <Route path="/additional-resources" component={AdditionalResourcesPage} />
    </HashRouter>
  );
}

export default Main;
