import React, { useState, useEffect, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  useIonModal,
  IonModal,
  IonButtons,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";
import useWalletsService from "../hooks/useWalletsService";
import ModalCreateNewWallet from "../components/ModalCreateNewWallet";
import ModalImportFromPrivate from "../components/ModalImportFromPrivate";
import ModalImportFromKeystore from "../components/ModalImportFromKeystore";
import { OverlayEventDetail } from "@ionic/core/components";
import { star, arrowBackCircleOutline } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import "./NewWallet.css";

interface Wallet {
  name: string;
  address: string;
  privateKey: string;
  password: string;
}

const NewWallet: React.FC = () => {
  const [t, i18n] = useTranslation("global");
  const [newWallet, setNewWallet] = useState<Wallet>({
    name: "",
    address: "",
    privateKey: "",
    password: "",
  });
  const { addWallet } = useWalletsService();
  const history = useHistory();
  const [openModalNewWallet, setOpenModalNewWallet] = useState(false);
  const [openModalWalletFromPrivate, setOpenModalWalletFromPrivate] =
    useState(false);
  const [openModalWalletFromKeystore, setOpenModalWalletFromKeystore] =
    useState(false);

  return (
    <IonPage id="new-wallet">
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
              <IonText color="secondary">
                {/* <h1 className="titleGradient">DUBX WALLETS</h1> */}
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
