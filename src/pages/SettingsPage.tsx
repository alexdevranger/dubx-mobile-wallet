import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonItem,
  IonToggle,
} from "@ionic/react";
import { arrowBackCircleOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import "./Settings.css";

interface LangStorage {
  language: string;
}

const SettingsPage: React.FC = () => {
  const [t, i18n] = useTranslation("global");
  const [provider, setProvider] = useState<string>(
    localStorage.getItem("provider") || "testnet"
  );
  const history = useHistory();
  const location = useLocation();
  const [lang, setLang] = useState<LangStorage>({ language: "en" });
  const [pinEnabled, setPinEnabled] = useState<boolean>(false);
  const [appPin, setAppPin] = useState<string | null>(null);

  useEffect(() => {
    const storedPinSetting = localStorage.getItem("pinEnabled");
    setPinEnabled(storedPinSetting === "true");
  }, []);

  useEffect(() => {
    const storedAppPin = localStorage.getItem("appPin");
    if (storedAppPin && storedAppPin !== "") {
      setAppPin(storedAppPin);
      // } else {
      //   setAppPin(null);
    }
    console.log("storedAppPin", storedAppPin);
  }, [location, pinEnabled]);
  useEffect(() => {
    const storedAppPin = localStorage.getItem("appPin");
    if (storedAppPin && storedAppPin !== "") {
      setAppPin(storedAppPin);
      // } else {
      //   setAppPin(null);
    }
    console.log("storedAppPin", storedAppPin);
  }, []);

  const handlePinToggleChange = () => {
    setPinEnabled(!pinEnabled);
    localStorage.setItem("pinEnabled", (!pinEnabled).toString());

    if (!pinEnabled) {
      localStorage.removeItem("appPin");
    }
  };

  const handleSetupPinClick = () => {
    setAppPin(null);
    setPinEnabled(false);
    history.push("/pin-setup");
  };

  const handleProviderChange = (event: CustomEvent) => {
    const selectedProvider = event.detail.value;
    setProvider(selectedProvider);
    localStorage.setItem("provider", selectedProvider);
  };

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setLang({ language });
    localStorage.setItem("language", JSON.stringify({ language }));
    document.documentElement.setAttribute(
      "dir",
      language === "ar" ? "rtl" : "ltr"
    );
  };

  useEffect(() => {
    const getLanguageFromStorage = localStorage.getItem("language") || "";
    if (getLanguageFromStorage) {
      const storedLanguage = JSON.parse(getLanguageFromStorage)?.language;
      if (storedLanguage) {
        setLang({ language: storedLanguage });
        i18n.changeLanguage(storedLanguage);
        document.documentElement.setAttribute(
          "dir",
          storedLanguage === "ar" ? "rtl" : "ltr"
        );
      }
    } else {
      setLang({ language: "en" });
      localStorage.setItem("language", JSON.stringify({ language: "en" }));
      document.documentElement.setAttribute("dir", "ltr");
    }
  }, [i18n]);
  console.log(appPin);

  return (
    <IonPage dir={lang.language === "ar" ? "rtl" : "ltr"}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("Settings")}</IonTitle>
          <IonButton
            onClick={() => history.goBack()}
            color="danger"
            slot="end"
            style={{ marginRight: "16px" }}
          >
            <IonIcon slot="start" icon={arrowBackCircleOutline}></IonIcon>
            {t("Back")}
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className="ion-text-center ion-grid">
          <IonRow className="ion-row">
            <IonCol size="12" className="logo-text">
              <IonText color="primary">
                <h1 className="titleGradient">{t("CHANGE NETWORK")}</h1>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div style={{ textAlign: "center" }}>
          <IonRadioGroup
            value={provider}
            onIonChange={handleProviderChange}
            className="horizontal-radio-group"
          >
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Testnet</IonLabel>
                  <IonRadio slot="start" value="testnet" />
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel>Mainnet</IonLabel>
                  <IonRadio slot="start" value="mainnet" />
                </IonItem>
              </IonCol>
            </IonRow>
          </IonRadioGroup>
          <IonGrid className="ion-text-center ion-grid">
            <IonRow className="ion-row">
              <IonCol size="12" className="logo-text">
                <IonText color="primary">
                  <h1 className="titleGradient">{t("PIN")}</h1>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid className="ion-text-center ion-grid">
            <IonRow className="ion-row">
              <IonCol size="12" className="logo-text flex-col">
                <IonItem>
                  <IonLabel>
                    {appPin ? t("Change PIN") : t("Enable PIN setup")}
                  </IonLabel>
                  <IonToggle
                    checked={pinEnabled}
                    onIonChange={handlePinToggleChange}
                  />
                </IonItem>
                {pinEnabled && (
                  // <IonButton onClick={handleSetupPinClick}>
                  //   I want to setup PIN now
                  // </IonButton>
                  <IonText color="medium" className="mt20">
                    <span
                      style={{
                        marginBottom: "10px",
                        cursor: "pointer",
                        marginTop: "20px",
                      }}
                      onClick={handleSetupPinClick}
                    >
                      {t("I want to setup PIN now")}
                    </span>
                  </IonText>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid className="ion-text-center ion-grid">
            <IonRow className="ion-row">
              <IonCol size="12" className="logo-text">
                <IonText color="primary">
                  <h1 className="titleGradient">{t("CHANGE LANGUAGE")}</h1>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid className="ion-text-center ion-grid">
            <IonRow className="ion-row">
              <IonCol size="6">
                <IonButton
                  color={lang.language === "en" ? "primary" : "medium"}
                  fill="outline"
                  expand="full"
                  className="mb custom-button"
                  onClick={() => handleChangeLanguage("en")}
                >
                  EN
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton
                  color={lang.language === "es" ? "primary" : "medium"}
                  fill="outline"
                  expand="full"
                  className="mb custom-button"
                  onClick={() => handleChangeLanguage("es")}
                >
                  ES
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton
                  color={lang.language === "ar" ? "primary" : "medium"}
                  fill="outline"
                  expand="full"
                  className="mb custom-button"
                  onClick={() => handleChangeLanguage("ar")}
                >
                  AR
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton
                  color={lang.language === "de" ? "primary" : "medium"}
                  fill="outline"
                  expand="full"
                  className="mb custom-button"
                  onClick={() => handleChangeLanguage("de")}
                >
                  DE
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton
                  color={lang.language === "ru" ? "primary" : "medium"}
                  fill="outline"
                  expand="full"
                  className="mb custom-button"
                  onClick={() => handleChangeLanguage("ru")}
                >
                  RU
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton
                  color={lang.language === "pl" ? "primary" : "medium"}
                  fill="outline"
                  expand="full"
                  className="mb custom-button"
                  onClick={() => handleChangeLanguage("pl")}
                >
                  PL
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton
                  color={lang.language === "sk" ? "primary" : "medium"}
                  fill="outline"
                  expand="full"
                  className="mb custom-button"
                  onClick={() => handleChangeLanguage("sk")}
                >
                  SK
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton
                  color={lang.language === "sr" ? "primary" : "medium"}
                  fill="outline"
                  expand="full"
                  className="mb custom-button"
                  onClick={() => handleChangeLanguage("sr")}
                >
                  SR
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
