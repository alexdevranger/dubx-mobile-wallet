import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import ModalCreateNewWallet from "../components/ModalCreateNewWallet";
import ModalImportFromPrivate from "../components/ModalImportFromPrivate";
import ModalImportFromKeystore from "../components/ModalImportFromKeystore";
import { arrowBackCircleOutline } from "ionicons/icons";
import "./NewWallet.css";

interface Wallet {
  name: string;
  address: string;
  privateKey: string;
  password: string;
}

const NewWallet: React.FC = () => {
  const [t, i18n] = useTranslation("global");
  const [openModalNewWallet, setOpenModalNewWallet] = useState(false);
  const [openModalWalletFromPrivate, setOpenModalWalletFromPrivate] =
    useState(false);
  const [openModalWalletFromKeystore, setOpenModalWalletFromKeystore] =
    useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      i18n.language === "ar" ? "rtl" : "ltr"
    );
  }, [i18n.language]);

  return (
    <IonPage id="new-wallet" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <IonHeader>
        <IonToolbar>
          <IonTitle> {t("New Wallet")}</IonTitle>
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
      <IonContent className="ion-padding">
        <IonGrid className="ion-text-center ion-grid">
          <IonRow className="ion-row">
            <IonCol size="12" className="logo-text">
              <IonImg className="logo" src="logo192.png" />
              <IonText color="primary">
                <p className="subtitleP">{t("Create new or")}</p>
                <p> {t("Import Existing")}</p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonButton
          className="btnImport"
          style={{ marginTop: "40px" }}
          expand="block"
          onClick={() => setOpenModalNewWallet(true)}
        >
          {t("CREATE NEW WALLET")}
        </IonButton>
        <IonButton
          className="btnImport"
          expand="block"
          onClick={() => setOpenModalWalletFromPrivate(true)}
        >
          {t("IMPORT WALLET FROM PRIVATE KEY")}
        </IonButton>
        <IonButton
          className="btnImport"
          expand="block"
          onClick={() => setOpenModalWalletFromKeystore(true)}
        >
          {t("IMPORT WALLET FROM KEYSTORE")}
        </IonButton>
        <ModalCreateNewWallet
          isOpen={openModalNewWallet}
          onDidDismiss={() => setOpenModalNewWallet(false)}
        />
        <ModalImportFromPrivate
          isOpen={openModalWalletFromPrivate}
          onDidDismiss={() => setOpenModalWalletFromPrivate(false)}
        />
        <ModalImportFromKeystore
          isOpen={openModalWalletFromKeystore}
          onDidDismiss={() => setOpenModalWalletFromKeystore(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default NewWallet;
