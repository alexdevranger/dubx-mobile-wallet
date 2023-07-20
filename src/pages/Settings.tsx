import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
} from "@ionic/react";
import { arrowBackCircleOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import "./Settings.css";

const Settings: React.FC = () => {
  const [t, i18n] = useTranslation("global");
  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      i18n.language === "ar" ? "rtl" : "ltr"
    );
  }, [i18n.language]);
  const [provider, setProvider] = useState(
    localStorage.getItem("provider") || "testnet"
  );

  const handleProviderChange = (event: CustomEvent) => {
    const selectedProvider = event.detail.value;
    setProvider(selectedProvider);
    localStorage.setItem("provider", selectedProvider);
  };

  return (
    <IonPage dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("Settings")}</IonTitle>
          <IonButton
            routerLink="/wallets"
            routerDirection="back"
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
          <IonSelect
            value={provider}
            onIonChange={handleProviderChange}
            style={{ margin: "auto", width: "30%" }}
            id="network"
          >
            <IonSelectOption value="testnet">Testnet</IonSelectOption>
            <IonSelectOption value="mainnet">Mainnet</IonSelectOption>
          </IonSelect>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
