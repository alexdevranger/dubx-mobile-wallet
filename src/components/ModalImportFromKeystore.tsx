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
  IonIcon,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";
import { eye, eyeOff } from "ionicons/icons";
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
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  const importWalletFromKeystore = async (
    keystoreFile: File,
    password: string,
    name: string
  ) => {
    setIsConfirming(true);
    try {
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
        console.log("Password or keystore is not correct.");
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsConfirming(false);
      setImportSuccess(true);
    } catch (err) {
      console.log(err);
      setIsConfirming(false);
      if ((err as Error).message === "invalid password") {
        setError("Invalid password.");
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };
  useEffect(() => {
    if (importSuccess) {
      resetForm();
      onDidDismiss();
      history.push("/wallets");
    }
  }, [importSuccess, onDidDismiss, history]);

  const openExplorer = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFileName(file?.name || null);
  };
  const resetForm = () => {
    setSelectedFileName(null);
    setPassword("");
    setError(null);
  };
  const importAndBack = async (event: any) => {
    const file = fileInputRef.current?.files?.[0];

    const newWallName: string = (
      document.getElementById("newNameFromKeystore") as HTMLInputElement
    ).value!.trim();
    const newPassword: string = (
      document.getElementById("newPasswordFromKeystore") as HTMLInputElement
    ).value!.trim();
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
      await importWalletFromKeystore(file, newPassword, newWallName);
      //if (error === "Invalid password.") return;
      // resetForm();
      // onDidDismiss();
      // history.push("/");

      // if (!error) {
      //   console.log(error);
      //   resetForm();
      //   onDidDismiss();
      //   history.push("/");
      // }

      // resetForm();
      // onDidDismiss();
      // history.push("/wallets");
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
        <div className="flex ion-text-center">
          <div>
            <IonText color="primary">
              <h1
                className="titleGradient"
                style={{ textTransform: "uppercase", marginBottom: "50px" }}
              >
                {t("Import from keystore")}
              </h1>
            </IonText>
            <IonButton
              className="button button-block"
              onClick={openExplorer}
              shape="round"
              fill="outline"
              color="medium"
              style={{ width: "50%", margin: "auto", marginBottom: "20px" }}
            >
              {t("Open Keystore")}
            </IonButton>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {selectedFileName && <p>{selectedFileName}</p>}
            <IonInput
              type="text"
              id="newNameFromKeystore"
              labelPlacement="stacked"
              label={t("Enter Name")}
              placeholder=""
            />
            <div style={{ display: "flex" }}>
              <IonInput
                type={showPassword ? "text" : "password"}
                value={password}
                onIonChange={(e) => setPassword(e.target.value.toString())}
                id="newPasswordFromKeystore"
                labelPlacement="stacked"
                label={t("Enter Password")}
                placeholder=""
              />
              <IonIcon
                icon={showPassword ? eyeOff : eye}
                onClick={toggleShowPassword}
                style={{ marginTop: "30px", fontSize: "20px" }}
                slot="end"
              />
            </div>
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

export default ModalImportFromKeystore;
