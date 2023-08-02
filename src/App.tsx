import React, { useState, useEffect } from "react";
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
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import NewWallet from "./pages/NewWallet";
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
import { wallet, settingsSharp, helpCircle } from "ionicons/icons";
import Wallets from "./pages/Wallets";
import WalletDetailPage from "./pages/WalletDetailPage";
import WalletRemovePage from "./pages/WalletRemovePage";
import SettingsPage from "./pages/SettingsPage";
import FAQ from "./pages/FAQ";
import LockScreen from "./pages/LockScreen";
import PinSetup from "./pages/PinSetup";

setupIonicReact();

const App: React.FC = () => {
  const [t, i18n] = useTranslation("global");
  const history = useHistory();
  const [isAppLocked, setAppLocked] = useState<boolean>(true);
  const [isPinSet, setPinSet] = useState<boolean>(false);

  useEffect(() => {
    const storedPin = localStorage.getItem("appPin");
    setPinSet(!!storedPin);
    console.log("isAppLocked", isAppLocked);
    console.log("isPinSet", isPinSet);
  }, []);

  const handleUnlock = () => {
    setAppLocked(false);
  };
  const handlePinSetupComplete = (pin: string) => {
    localStorage.setItem("appPin", pin);
    console.log("PIN setup complete:", pin);
    setAppLocked(false);
    setPinSet(true);
    // onPinSet(pin);
  };

  // const handlePinSet = (pin: string) => {
  //   console.log("PIN setup complete:", pin);
  //   setAppLocked(false); // Unlock the app after successful PIN setup
  //   setPinSet(true);
  // };

  const handlePinSkip = () => {
    //localStorage.removeItem("appPin");
    localStorage.setItem("appPin", "");
    setAppLocked(false);
    setPinSet(false);

    // history.push("/");
  };

  if (isAppLocked) {
    if (isPinSet) {
      return <LockScreen onUnlock={handleUnlock} />;
    } else if (!isPinSet && localStorage.getItem("appPin") === "") {
      handlePinSkip();
      //setAppLocked(false);
      return null;
    } else {
      return (
        <PinSetup
          onPinSet={handlePinSetupComplete}
          onSkipSetup={handlePinSkip}
        />
      );
    }
  }
  console.log("isAppLocked", isAppLocked);
  console.log("isPinSet", isPinSet);
  return (
    <IonApp>
      <IonReactRouter>
        <Menu />
        <IonTabs>
          <IonRouterOutlet id="main">
            <Route exact path="/wallets">
              <Wallets />
              {/* {isAppLocked ? (
                <Redirect to="/pin-setup" />
              ) : (
                <Redirect to="/wallets" />
              )} */}
            </Route>
            <Route exact path="/">
              <Redirect to="/wallets" />
              {/* {isAppLocked ? (
                <Redirect to="/pin-setup" />
              ) : (
                <Redirect to="/wallets" />
              )} */}
            </Route>
            <Route exact path="/wallets/:address">
              <WalletDetailPage />
            </Route>
            <Route exact path="/delete/:address">
              <WalletRemovePage />
            </Route>
            <Route exact path="/new-wallet">
              <NewWallet />
            </Route>
            <Route exact path="/settings-page">
              <SettingsPage />
            </Route>
            <Route exact path="/faq">
              <FAQ />
            </Route>
            <Route exact path="/pin-setup">
              <PinSetup
                onPinSet={handlePinSetupComplete}
                onSkipSetup={handlePinSkip}
              />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/">
              <IonIcon icon={wallet} style={{ color: "white" }} />
              <IonLabel style={{ color: "#3ce0f5" }}>{t("Wallets")}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings-page">
              <IonIcon icon={settingsSharp} style={{ color: "white" }} />
              <IonLabel style={{ color: "#3ce0f5" }}>{t("Settings")}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="faq" href="/faq">
              <IonIcon
                icon={helpCircle}
                style={{ color: "white", fontSize: "24px" }}
              />
              <IonLabel style={{ color: "#3ce0f5" }}>{t("FAQ")}</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
// function onPinSet(pin: string) {
//   throw new Error("Function not implemented.");
// }
