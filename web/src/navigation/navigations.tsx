import { Routes, Route } from "react-router";
// import { RequireAuth, NotFound } from "../components";
import PluginList from '../routes/plugins/PluginList';
import Home from '../routes/home/Home';
import { PluginDetailsScreen } from '../routes/plugins/plugin-details.screen';
import { AccountDetailsScreen } from '../routes/account/account-details.screen';
// import { GlobalStyle } from "../utils";
import { RoutePath } from "./route-path";

export const Navigation = () => {
  return (
    <Routes>
      <Route path={RoutePath.home} element={<PluginList />} />
      <Route path={RoutePath.login} element={<PluginList />} />
      <Route path={RoutePath.plugins} element={<PluginList />} />
      <Route path={RoutePath.account} element={<AccountDetailsScreen />} />
      <Route path={RoutePath.pluginDetails} element={<PluginDetailsScreen />} />

    </Routes>
  );
};

export const LandingPageNavigation = () => {
  return (
    <>
      {/* <GlobalStyle /> */}
      <Routes>
        <Route path={RoutePath.home} element={<Home />} />
      </Routes>
    </>
  );
};
