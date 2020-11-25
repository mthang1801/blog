import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation/navigation.component";
import GlobalStyles from "./global.styles";
import Loader from "./components/UI/loader/loader.component"
const Auth = lazy(() => import("./pages/auth.pages"));
const Posts = lazy(() => import("./pages/posts.pages"));
function App() {
  return (
    <Router>
      <GlobalStyles />
      <Navigation />
      <Suspense fallback={<Loader/>}>
        <Switch>
          <Route path="/posts" exact component={Posts} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
