import React, { useState, useEffect } from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Menu.css";

const Menu = () => {
  const [t, i18n] = useTranslation("global");
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [currentNetwork, setCurrentNetwork] = useState("");
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      i18n.language === "ar" ? "rtl" : "ltr"
    );
  }, [i18n.language]);
  useEffect(() => {
    const savedLanguage = JSON.parse(localStorage.getItem("language"));
    setCurrentLanguage(savedLanguage?.language || "EN");
    const savedNetwork = localStorage.getItem("provider");
    setCurrentNetwork(savedNetwork || "TESTNET");
  }, [location]);
  console.log(currentLanguage);
  console.log(currentNetwork);
  return (
    <IonMenu side="end" contentId="main">
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle>MENU</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/wallets"} routerDirection="none">
              <IonLabel>Wallets</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/languages"} routerDirection="none">
              <IonLabel>Languages</IonLabel>
            </IonItem>
            <IonItem button routerLink={"/settings"} routerDirection="none">
              <IonLabel>Settings</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
        <div className="submenuHolder">
          <IonText color="primary" className="mb20">
            <div className="label-text-wrapper sc-ion-input-md">
              <div className="label-text sc-ion-input-md">
                {t("Current language: ")}
              </div>
            </div>
            <IonButton
              color="primary"
              fill="outline"
              className="mb ml15 uppercase"
            >
              {currentLanguage}
            </IonButton>
          </IonText>
          <IonText color="primary" className="mb20">
            <div className="label-text-wrapper sc-ion-input-md">
              <div className="label-text sc-ion-input-md">
                {t("Current network: ")}
              </div>
            </div>
            <IonButton
              color="primary"
              fill="outline"
              className="mb ml15 uppercase"
            >
              {currentNetwork}
            </IonButton>
          </IonText>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
