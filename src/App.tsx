import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonTabBar,
  IonIcon,
  IonLabel,
  IonSplitPane,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useTranslation } from "react-i18next";
import Home from "./pages/Wallets";
import Details from "./pages/Details";
import NewWallet from "./pages/NewWallet";
import Persona from "./pages/Persona";
import Menu from "./components/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { wallet, star } from "ionicons/icons";
import WalletDetailPage from "./pages/WalletDetailPage";
import WalletRemovePage from "./pages/WalletRemovePage";
import Languages from "./pages/Languages";

setupIonicReact();

const App: React.FC = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <IonApp>
      <IonReactRouter>
        <Menu />
        <IonTabs>
          <IonRouterOutlet id="main">
            <Route exact path="/wallets">
              <Home />
            </Route>
            <Route exact path="/">
              <Redirect to="/wallets" />
            </Route>
            <Route exact path="/wallets/:address">
              <WalletDetailPage />
            </Route>
            <Route exact path="/delete/:address">
              <WalletRemovePage />
            </Route>
            <Route exact path="/details">
              <Details />
            </Route>
            <Route exact path="/new-wallet">
              <NewWallet />
            </Route>
            <Route exact path="/languages">
              <Languages />
            </Route>
            <Route exact path="/persona">
              <Persona />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/wallets">
              <IonIcon icon={wallet} style={{ color: "white" }} />
              <IonLabel style={{ color: "#3ce0f5" }}>{t("Wallets")}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="languages" href="/languages">
              <IonIcon icon={star} style={{ color: "white" }} />
              <IonLabel style={{ color: "#3ce0f5" }}>{t("Languages")}</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
