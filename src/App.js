import React, { useEffect } from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import PageNotFound from "./Utilities/PageNotFound";
import Home from "./components/sections/Home/Home";
import Routes from "./Utilities/Routes";
import ProtectedRoute from "./Utilities/ProtectedRoute";

import AuthenticationPage from "./components/auth/AuthPage";
import PublicShop from "./components/sections/PublicShop/PublicShop";
import ForgtopassEmail from "./components/sections/ForgotPassword/ForgtopassEmail";
import { useDispatch } from "react-redux";
import { selectedShopId } from "./action/shopAction";
import { selectedShopName } from "./action/shopAction";
import { shopIdsAction } from "./action/shopAction";

import { getShopIds } from "./services/dashboardService";
import Forgotpass from "./components/sections/ForgotPassword/Forgotpass";
import EmailOtp from "./components/auth/EmailOtp";
import MobileOtp from "./components/auth/MobileOtp";
import EditProduct from "./components/sections/Shop/EditProduct";

function App() {
  let userToken = localStorage.getItem("token");

  const routes = Routes();
  let dispatch = useDispatch();
  useEffect(() => {
    if (userToken) {
      shopsIdsCollections();
    }
  }, []);

  let shopsIdsCollections = async () => {
    let { data } = await getShopIds(userToken);

    if (data.Success && data.Details.length > 0) {
      dispatch(shopIdsAction(data.Details));
      dispatch(selectedShopId(data.Details[0].shop));
      dispatch(selectedShopName(data.Details[0].shop_name));
    }
  };

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => {
            if (localStorage.getItem("token") === null) {
              return <AuthenticationPage {...props} />;
            }
            return <Redirect to="/dashboard" />;
          }}
        />
        <Route exact path="/page-not-found">
          <PageNotFound />
        </Route>
        <Route path="/shop">
          <PublicShop />
        </Route>
        <Route path="/forgotPass">
          <ForgtopassEmail />
        </Route>
        <Route path="/resetPass">
          <Forgotpass />
        </Route>
        <Route path="/mailOtp">
          <EmailOtp />
        </Route>
        <Route path="/mobileOtp">
          <MobileOtp />
        </Route>
        <Route path="/editProduct">
          <EditProduct />
        </Route>
        <Home>
          <Switch>
            {routes.map((route) => {
              return (
                <ProtectedRoute
                  exact
                  path={route.path}
                  component={route.component}
                />
              );
            })}

            <Route path="*">
              <Redirect to="/page-not-found" />
            </Route>
          </Switch>
        </Home>
      </Switch>
    </div>
  );
}

export default App;
