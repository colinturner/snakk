import React from "react";
import { Route, HashRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import VerbsFlashcardsPage from "../pages/Verbs/VerbsFlashcardsPage/VerbsFlashcardsPage";
import ChooseLanguagePage from "../pages/ChooseLanguagePage/ChooseLanguagePage";

function Main() {
  return (
    <HashRouter>
      <Route exact path="/" component={HomePage} />
      <Route path="/languages" component={ChooseLanguagePage} />
      {/* <Route path="/verbs" component={ChooseVerbsPage} /> */}
      <Route path="/verbs/flashcards" component={VerbsFlashcardsPage} />
      {/* <Route path="/verbs/typing" component={VerbsTypingPage} />
      <Route path="/nouns" component={ChooseNounsPage} />
      <Route path="/nouns/flashcards" component={NounsFlashcardsPage} />
      <Route path="/nouns/typing" component={NounsTypingPage} /> */}
      <Route path="/learn" component={VerbsFlashcardsPage} />
    </HashRouter>
  );
}

export default Main;
