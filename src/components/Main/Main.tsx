import React from "react";
import { Route, HashRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import VerbsPage from "../pages/Verbs/VerbsPage/VerbsPage";
import VerbsTypingPage from "../pages/Verbs/VerbsTypingPage/VerbsTypingPage";
import VerbsFlashcardsPage from "../pages/Verbs/VerbsFlashcardsPage/VerbsFlashcardsPage";
import ChooseLanguagePage from "../pages/ChooseLanguagePage/ChooseLanguagePage";

function Main() {
  return (
    <HashRouter>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/languages" component={ChooseLanguagePage} />
      <Route exact path="/verbs" component={VerbsPage} />
      <Route exact path="/verbs/flashcards" component={VerbsFlashcardsPage} />
      <Route exact path="/verbs/typing" component={VerbsTypingPage} />
      {/* <Route exact path="/nouns" component={ChooseNounsPage} />
      <Route exact path="/nouns/flashcards" component={NounsFlashcardsPage} />
      <Route exact path="/nouns/typing" component={NounsTypingPage} />
      <Route exact path="/learn" component={ChooseCategoryPage} /> */}
    </HashRouter>
  );
}

export default Main;
