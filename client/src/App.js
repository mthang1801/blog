import React, { lazy, Suspense } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Loader from "./components/UI/loader/loader.component";
import Layout from "./components/Layout/layout";
const Auth = lazy(() => import("./pages/auth.pages"));
const Posts = lazy(() => import("./pages/posts.pages"));
function App() {
  const routes = (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/posts" exact component={Posts} />
        <Route path="/auth" exact component={Auth} />
      </Switch>
    </Suspense>
  );
  return <Layout>{routes}</Layout>;
}

export default App;
