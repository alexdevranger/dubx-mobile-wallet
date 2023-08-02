import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonModal,
  IonText,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";
import { createProvider } from "../utils/helper";
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
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  const resetForm = () => {
    setError(null);
    const newFromPrivate = document.getElementById(
      "newFromPrivate"
    ) as HTMLInputElement;
    const newNameFromPrivate = document.getElementById(
      "newNameFromPrivate"
    ) as HTMLInputElement;

    if (newFromPrivate && newNameFromPrivate) {
      newFromPrivate.value = "";
      newNameFromPrivate.value = "";
    }
  };

  const importWalletFromPrivateKey = async (
    privateKey: string,
    name: string
  ) => {
    setIsConfirming(true);
    try {
      const savedNetwork: any = localStorage.getItem("provider") || "testnet";
      const provider = await createProvider(savedNetwork);
      const wallet = await new ethers.Wallet(privateKey, provider);
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
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsConfirming(false);
    } catch (error: any) {
      console.log("An error occurred:", error);
      setIsConfirming(false);
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
    const walletsFromLocalstorage = await JSON.parse(
      localStorage.getItem("wallets") || "[]"
    );
    const isNameExists = walletsFromLocalstorage.some(
      (walletItem: any) => walletItem.name === newWallName
    );

    if (isNameExists) {
      setError("Wallet name already exists. Please choose a different name.");
      return;
    }
    try {
      setError("");
      await importWalletFromPrivateKey(newPrivKey, newWallName);
      resetForm();
      onDidDismiss();
      history.push("/wallets");
    } catch (err: any) {
      if (err.code === ethers.errors.INVALID_ARGUMENT) {
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
        <div className="flex ion-text-center">
          <div>
            <IonText color="primary">
              <h1
                className="titleGradient"
                style={{ textTransform: "uppercase", marginBottom: "50px" }}
              >
                {t("Import from private key")}
              </h1>
            </IonText>
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
            <IonButton
              className="btnImp"
              expand="block"
              onClick={importAndBack}
              disabled={isConfirming}
            >
              {isConfirming ? t("Creating") : t("Confirm")}
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default ModalImportFromPrivate;
