import React from "react";
import { Route, HashRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import VerbsPage from "../pages/VerbsPage/VerbsPage";
import AdditionalResourcesPage from "../pages/AdditionalResourcesPage/AdditionalResourcesPage";
import ChooseLanguagePage from "../pages/ChooseLanguagePage/ChooseLanguagePage";

function Main() {
  return (
    <HashRouter>
      <Route exact path="/" component={HomePage} />
      <Route path="/languages" component={ChooseLanguagePage} />
      <Route path="/learn" component={VerbsPage} />
      <Route path="/additional-resources" component={AdditionalResourcesPage} />
    </HashRouter>
  );
}

export default Main;
