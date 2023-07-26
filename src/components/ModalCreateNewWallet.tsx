import React, { useState, useEffect, useRef } from "react";
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
import "./Modals.css";

interface ModalProps {
  isOpen: boolean;
  onDidDismiss: () => void;
}

const ModalCreateNewWallet: React.FC<ModalProps> = ({
  isOpen,
  onDidDismiss,
}) => {
  const history = useHistory();
  const [error, setError] = useState<string | null>(null);
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  const createRandomWallet = async (name: string) => {
    const wallet = await ethers.Wallet.createRandom();
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
  const importAndBack = async (event: any) => {
    const newWallName: string = (
      document.getElementById("newNameFromPrivate") as HTMLInputElement
    ).value!.trim();
    if (!newWallName) {
      setError("Please enter some name for your wallet.");
      throw Error("Please enter a name for wallet");
    }
    try {
      await createRandomWallet(newWallName);
      onDidDismiss();
      history.push("/wallets");
    } catch (err) {
      console.log(err);
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
          <IonTitle>{t("Create Wallet")}</IonTitle>
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
                {t("CREATE NEW WALLET")}
              </h1>
            </IonText>
            <IonInput
              type="text"
              id="newNameFromPrivate"
              labelPlacement="stacked"
              label={t("Enter Name")}
              placeholder=""
            />
            {error && <p className="error-message text-center">{error}</p>}
            <IonButton
              className="btnImp"
              expand="block"
              onClick={importAndBack}
            >
              {t("Confirm")}
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default ModalCreateNewWallet;
