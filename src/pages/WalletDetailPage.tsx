import { useEffect, useState } from "react";
import {
  IonItem,
  IonLabel,
  IonList,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonIcon,
  IonText,
  IonToast,
  IonLoading,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import ModalQRCode from "../components/ModalQRCode";
import { useTranslation } from "react-i18next";
import ModalCreateNewWallet from "../components/ModalCreateNewWallet";
import { ethers } from "ethers";
import { getBalance, createProvider } from "../utils/helper";
import { QRCodeCanvas } from "qrcode.react";
import {
  star,
  arrowBackCircleOutline,
  openOutline,
  arrowRedoOutline,
  trash,
  qrCodeOutline,
  refreshCircleOutline,
} from "ionicons/icons";

import "./WalletDetailPage.css";

interface WalletDetailPageParams {
  address: string;
}

const WalletDetailPage: React.FC = () => {
  const { address } = useParams<WalletDetailPageParams>();

  const [t, i18n] = useTranslation("global");

  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [balance, setBalance] = useState("0.00");
  const [isSendHolderVisible, setIsSendHolderVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingTx, setPendingTx] = useState(false);
  const [minedTx, setMinedTx] = useState(false);
  const [hash, setHash] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const togglePrivateKeyVisibility = () => {
    setShowPrivateKey((prevState) => !prevState);
  };

  const toggleSendHolder = () => {
    setIsSendHolderVisible((prevValue) => !prevValue);
  };

  useEffect(() => {
    const getAddrBalance = async (addr: string) => {
      const balAddr: string = await getBalance(addr);
      setBalance(balAddr);
    };
    getAddrBalance(address);
  }, []);
  // Retrieve wallets from local storage
  const walletsFromLocalStorage = JSON.parse(
    localStorage.getItem("wallets") || "[]"
  );

  // Find the wallet that matches the address
  const matchedWallet = walletsFromLocalStorage.find(
    (wallet: any) => wallet.address === address
  );

  // Extract name and private key from the matched wallet
  const { name, privateKey } = matchedWallet || {};
  const copyPrivateKey = async () => {
    try {
      await navigator.clipboard.writeText(privateKey);
      setShowToast(true);
    } catch (error) {
      console.log("Error copying private key:", error);
    }
  };
  const sendDubx = async () => {
    try {
      const provider = await createProvider();
      const signer = new ethers.Wallet(privateKey, provider);

      const addrTo: string = (
        document.getElementById("addressTo") as HTMLInputElement
      ).value!.trim();
      console.log(addrTo);
      const amountDubx: any = (
        document.getElementById("amount") as HTMLInputElement
      ).value!.trim();
      console.log(amountDubx);
      if (!addrTo) {
        setError("Please enter address to send.");
        throw Error("Please enter address to send");
      }
      if (!amountDubx) {
        setError("Please enter amount to send");
        throw Error("Please enter amount to send");
      }

      const transaction = {
        to: addrTo,
        value: ethers.utils.parseEther(`${amountDubx}`),
      };

      const signedTransaction = await signer.sendTransaction(transaction);
      console.log("Transaction sent:", signedTransaction);

      setPendingTx(true);
      setShowLoading(true);
      setMinedTx(false);

      const receipt = await signedTransaction.wait();

      setPendingTx(false);
      setShowLoading(false);
      setMinedTx(true);
      setIsSendHolderVisible(false);
      setHash(receipt.transactionHash);

      console.log("Transaction mined - Hash:", receipt.transactionHash);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };
  const removeWalletClick = () => {
    history.push(`/delete/${address}`);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ color: "#fff" }}>{name}</IonTitle>
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
        <div className="page-container">
          <div className="image-container">
            <img className="" src="ukras.webp" alt="Detail" />
          </div>

          <IonLabel>
            <div className="detail-holder">
              <IonText color="secondary">
                <div className="label-text-wrapper sc-ion-input-md">
                  <div className="label-text sc-ion-input-md">
                    {t("Address")}
                  </div>
                </div>
              </IonText>
            </div>
            <IonText color="dark">
              <p>{address}</p>
            </IonText>
            <div className="flex-qr">
              <div className="balanceHolder">
                <div className="detail-holder">
                  <IonText color="secondary">
                    <div className="label-text-wrapper sc-ion-input-md">
                      <div className="label-text sc-ion-input-md">
                        {t("Balance")} [ DUBX ]
                      </div>
                    </div>
                  </IonText>
                </div>
                <IonText color="dark">
                  <p>{parseFloat(balance).toFixed(4)}</p>
                </IonText>
              </div>
              <div className="btn-qr">
                <IonButton
                  onClick={handleOpenModal}
                  color="danger"
                  slot="end"
                  className="btn-qr"
                >
                  {t("share")}
                  <br /> {t("qr code")}
                  <IonIcon
                    slot="end"
                    icon={qrCodeOutline}
                    size="large"
                    color="primary"
                  ></IonIcon>
                </IonButton>
              </div>
            </div>
            <div className="detail-holder" style={{ marginTop: "20px" }}>
              <IonText color="secondary">
                <div className="label-text-wrapper sc-ion-input-md">
                  <div className="label-text sc-ion-input-md">
                    {t("Private Key")}
                  </div>
                </div>
              </IonText>
            </div>
            <IonText color="dark" className="pHeightKey">
              {showPrivateKey ? (
                <p>{privateKey}</p>
              ) : (
                <p>
                  ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
                </p>
              )}
            </IonText>
          </IonLabel>
          <div style={{ textAlign: "center" }}>
            <IonButton
              onClick={togglePrivateKeyVisibility}
              className="btn-pr"
              style={{ width: "100px" }}
            >
              {showPrivateKey ? t("Hide") : t("Show")}
            </IonButton>
            <IonButton className="btn-pr" onClick={copyPrivateKey}>
              {t("Copy Private Key")}
            </IonButton>
          </div>

          <h2 className="easySend" onClick={toggleSendHolder}>
            {t("EASY SEND")}
            <IonIcon
              slot="end"
              icon={openOutline}
              style={{ paddingLeft: "7px" }}
            ></IonIcon>
          </h2>
          <div
            className={`sendHolder item-card ${
              isSendHolderVisible ? "visible" : ""
            }`}
          >
            <div style={{ margin: "10px" }}>
              <IonInput
                type="text"
                id="addressTo"
                style={{ fontSize: "14px" }}
                color="medium"
                labelPlacement="stacked"
                label={t("Address To")}
                placeholder=""
              ></IonInput>{" "}
              <IonInput
                type="number"
                id="amount"
                style={{ fontSize: "14px" }}
                color="medium"
                labelPlacement="stacked"
                label={t("Amount [ DUBX ]")}
                placeholder=""
              ></IonInput>
              {error && <p className="error-message">{error}</p>}
              <IonButton
                style={{ marginTop: "20px" }}
                expand="block"
                shape="round"
                fill="outline"
                color="medium"
                onClick={sendDubx}
              >
                {t("Send")}
              </IonButton>
            </div>
          </div>
          {pendingTx && (
            <>
              <p className="error-message">
                <i>{t("Mining is in progress ...")}</i>
              </p>
              {/* <IonLoading
                isOpen={showLoading}
                message="Please wait..."
                spinner="dots"
              /> */}
              <ul className="dotted">
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </>
          )}
          {minedTx && (
            <div>
              <p className="mining-message">
                {t("Tx mined. Tx hash:")} {hash}{" "}
              </p>
              <a
                className="mining-message easySend"
                href={`https://explorer.arabianchain.org/#/tx/${hash}`}
              >
                {t("Go to explorer")}
                <IonIcon
                  slot="end"
                  icon={arrowRedoOutline}
                  style={{ paddingLeft: "7px" }}
                ></IonIcon>
              </a>
            </div>
          )}
          <div className="mt40">
            <IonButton
              onClick={removeWalletClick}
              color="danger"
              slot="end"
              className="btn-remove"
            >
              {t("remove")}
              <br /> {t("wallet")}
              <IonIcon
                slot="end"
                icon={trash}
                // style={{ paddingLeft: "7px" }}
                size="large"
                color="primary"
              ></IonIcon>
            </IonButton>
          </div>
          {/* <IonButton onClick={generateQRCode}>Generate QR Code</IonButton> */}
          {/* <IonButton onClick={handleOpenModal}>Open Modal</IonButton> */}
          {/* {isModalOpen && ( */}
          {/* <ModalQRCode address={address} onClose={handleCloseModal} /> */}
          {/* )} */}
          {/* <IonButton
            className="btnImport"
            style={{ marginTop: "40px" }}
            expand="block"
            onClick={() => setIsModalOpen(true)}
          >
            OPEN RANDOM WALLET
          </IonButton> */}
          <ModalQRCode
            isOpen={isModalOpen}
            address={address}
            onDidDismiss={() => setIsModalOpen(false)}
          />
          <IonToast
            isOpen={showToast}
            message="Copied"
            duration={2000}
            cssClass="custom-toast"
            onDidDismiss={() => setShowToast(false)}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WalletDetailPage;
