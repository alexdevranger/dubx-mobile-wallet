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
  IonButtons,
  IonIcon,
  IonModal,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";
import useWalletsService from "../hooks/useWalletsService";
import { createProvider } from "../utils/helper";
import { OverlayEventDetail } from "@ionic/core/components";
import { star, arrowBackCircleOutline } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import "./Modals.css";

interface ModalProps {
  isOpen: boolean;
  onDidDismiss: () => void;
}

const ModalImportFromPrivate: React.FC<ModalProps> = ({
  isOpen,
  onDidDismiss,
}) => {
  const history = useHistory();
  const [error, setError] = useState<string | null>(null);
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  const importWalletFromPrivateKey = async (
    privateKey: string,
    name: string
  ) => {
    try {
      const provider = await createProvider();
      const wallet = await new ethers.Wallet(privateKey, provider);
      console.log(wallet);
      if (
        wallet &&
        ethers.utils.isAddress(wallet.address) &&
        /^([A-Fa-f0-9]{64})$/.test(wallet.privateKey.substring(2, 66))
      ) {
        const newWall = {
          name: name,
          address: wallet.address,
          privateKey: wallet.privateKey.substring(2, 66),
          password: "",
        };
        const walletsFromLocalstorage = await JSON.parse(
          localStorage.getItem("wallets") || "[]"
        );
        await walletsFromLocalstorage.push(newWall);
        localStorage.setItem(
          "wallets",
          JSON.stringify(walletsFromLocalstorage)
        );
      } else {
        setError("Invalid wallet address or private key");
        console.log("Invalid wallet address or private key", Error);
      }
    } catch (error: any) {
      console.log("An error occurred:", error);
      //   if (error.code === ethers.utils.Logger.errors.INVALID_ARGUMENT) {
      //     setError("Private key is not correct");
      //   } else {
      //     console.log("An error occurred:", error);
      //   }
    }
  };
  const importAndBack = async (event: any) => {
    const newPrivKey: string = (
      document.getElementById("newFromPrivate") as HTMLInputElement
    ).value!.trim();
    const newWallName: string = (
      document.getElementById("newNameFromPrivate") as HTMLInputElement
    ).value!.trim();
    if (!newPrivKey) {
      setError("Please enter a private key for wallet.");
      throw Error("Please enter a private key");
    }
    if (!newWallName) {
      setError("Please enter some name for wallet.");
      throw Error("Please enter a name for wallet");
    }
    if (!/^([A-Fa-f0-9]{64})$/.test(newPrivKey)) {
      console.log("not correct");
      setError("Private key is not correct");
      throw Error("Please enter a correct private key");
    }
    try {
      await importWalletFromPrivateKey(newPrivKey, newWallName);
      onDidDismiss();
      history.push("/wallets");
    } catch (err: any) {
      if (err.code === ethers.errors.INVALID_ARGUMENT) {
        console.log("KODE", err.code);
        console.log("not correct");
        setError("Private key is not correct");
        throw Error("Please enter a correct private key");
      } else {
        console.log("An error occurred:", err);
      }
    }
  };
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButton
            color="danger"
            onClick={() => onDidDismiss()}
            slot="end"
            style={{ marginRight: "16px" }}
          >
            {t("Cancel")}
          </IonButton>
          <IonTitle>{t("Import Wallet")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          type="text"
          id="newFromPrivate"
          labelPlacement="stacked"
          label={t("Enter Private Key")}
          placeholder=""
        />
        <IonInput
          type="text"
          id="newNameFromPrivate"
          labelPlacement="stacked"
          label={t("Enter Name")}
          placeholder=""
        />
        {error && <p className="error-message">{error}</p>}
        <IonButton className="btnImp" expand="block" onClick={importAndBack}>
          {t("Confirm")}
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default ModalImportFromPrivate;
