import { Switch, Route, Router as WouterRouter } from "wouter";
import VelourActiveEmail from "@/pages/VelourActiveEmail";
import ShopPage from "@/pages/ShopPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={VelourActiveEmail} />
      <Route path="/shop" component={ShopPage} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
