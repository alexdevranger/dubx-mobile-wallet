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

const ModalImportFromKeystore: React.FC<ModalProps> = ({
  isOpen,
  onDidDismiss,
}) => {
  const history = useHistory();
  const [error, setError] = useState<string | null>(null);
  const [t, i18n] = useTranslation("global");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  const importWalletFromKeystore = async (
    keystoreFile: File,
    password: string,
    name: string
  ) => {
    const reader = new FileReader();
    const readFile = () =>
      new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsText(keystoreFile);
      });
    const keystore = await readFile();
    const parsedKeystore = JSON.parse(keystore);
    const wallet = await ethers.Wallet.fromEncryptedJson(
      JSON.stringify(parsedKeystore),
      password
    );
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
      localStorage.setItem("wallets", JSON.stringify(walletsFromLocalstorage));
    } else {
      console.log("Invalid wallet address or private key");
    }
  };
  const openExplorer = () => {
    fileInputRef.current?.click();
  };
  const importAndBack = async (event: any) => {
    const file = fileInputRef.current?.files?.[0];
    console.log(file);

    const newWallName: string = (
      document.getElementById("newNameFromKeystore") as HTMLInputElement
    ).value!.trim();
    console.log(newWallName);
    const newPassword: string = (
      document.getElementById("newPasswordFromKeystore") as HTMLInputElement
    ).value!.trim();
    console.log(newPassword);
    if (!file) {
      setError("Please upload a keystore file for wallet.");
      throw Error("Please upload a keystore file");
    }
    if (!newPassword) {
      setError("Please enter a keystore password.");
      throw Error("Please enter a password");
    }
    if (!newWallName) {
      setError("Please enter some name for allet.");
      throw Error("Please enter a name for wallet");
    }
    try {
      await importWalletFromKeystore(file, newPassword, newWallName);
      onDidDismiss();
      history.push("/wallets");
    } catch (err: any) {
      setError("Password or keystore is not correct.");
      console.log("An error occurred:", err);
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
        {/* <IonInput>
          <input
            type="file"
            accept=".json"
            ref={fileInputRef}
            id="newFileFromKeystore"
          />
        </IonInput> */}
        {/* <label className="item item-input">
          <IonLabel>File</IonLabel>
          <input type="text" value={fileName} readOnly placeholder="..." />
        </label> */}
        <IonButton
          className="button button-block"
          onClick={openExplorer}
          shape="round"
          fill="outline"
          color="medium"
          style={{ width: "50%", margin: "auto" }}
        >
          {t("Open Keystore")}
        </IonButton>
        <input
          type="file"
          style={{ display: "none" }}
          //   onChange={handleFileChange}
          ref={fileInputRef}
        />
        <IonInput
          type="text"
          id="newNameFromKeystore"
          labelPlacement="stacked"
          label={t("Enter Name")}
          placeholder=""
        />
        <IonInput
          type="password"
          id="newPasswordFromKeystore"
          labelPlacement="stacked"
          label={t("Enter Password")}
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

export default ModalImportFromKeystore;
