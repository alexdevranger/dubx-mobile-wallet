import { ChangeEvent, useEffect, useState, useRef } from "react";
import {
  IonLabel,
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
  IonGrid,
  IonRow,
  IonCol,
  InputChangeEventDetail,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import ModalQRCode from "../components/ModalQRCode";
import { useTranslation } from "react-i18next";
import { ethers } from "ethers";
import { getBalance, createProvider, getTx } from "../utils/helper";
import { Clipboard } from "@capacitor/clipboard";
import {
  star,
  arrowBackCircleOutline,
  openOutline,
  arrowRedoOutline,
  trash,
  qrCodeOutline,
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
  const [currentNetwork, setCurrentNetwork] = useState("");
  const [isSendHolderVisible, setIsSendHolderVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingTx, setPendingTx] = useState(false);
  const [minedTx, setMinedTx] = useState(false);
  const [hash, setHash] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showTxInfo, setShowTxInfo] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const [txObject, setTxObject] = useState({
    network: "",
    from: "",
    to: "",
    amount: "",
  });

  const history = useHistory();
  const location = useLocation();

  const togglePrivateKeyVisibility = () => {
    setShowPrivateKey((prevState) => !prevState);
  };

  const toggleSendHolder = () => {
    setIsSendHolderVisible((prevValue) => !prevValue);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      i18n.language === "ar" ? "rtl" : "ltr"
    );
  }, [i18n.language]);

  useEffect(() => {
    const getAddrBalance = async (addr: string) => {
      const savedNetwork: any = localStorage.getItem("provider") || "testnet";
      const balAddr: string = await getBalance(addr, savedNetwork);
      setBalance(balAddr);
      setCurrentNetwork(savedNetwork);
    };
    getAddrBalance(address);
  }, [location]);
  //console.log("balance111", balance);
  const walletsFromLocalStorage = JSON.parse(
    localStorage.getItem("wallets") || "[]"
  );

  const matchedWallet = walletsFromLocalStorage.find(
    (wallet: any) => wallet.address === address
  );

  const { name, privateKey } = matchedWallet || {};
  const copyPrivateKey = async () => {
    try {
      await Clipboard.write({
        string: privateKey,
      });
      setShowToast(true);
    } catch (error) {
      console.log("Error copying private key:", error);
    }
  };
  const getTxsInfo = async (tx: string) => {
    const savedNetwork: any = localStorage.getItem("provider") || "testnet";
    const txn: any = await getTx(tx, savedNetwork);
    console.log(txn);
    const value = txn.value;
    const amount = ethers.utils.formatEther(value);
    const txInfo = {
      network: savedNetwork,
      from: txn.from,
      to: txn.to,
      amount: amount,
    };
    return txInfo;
  };
  const sendDubx = async () => {
    try {
      const savedNetwork: any = localStorage.getItem("provider") || "testnet";
      const provider = await createProvider(savedNetwork);
      const signer = new ethers.Wallet(privateKey, provider);

      const addrTo: string = (
        document.getElementById("addressTo") as HTMLInputElement
      ).value!.trim();
      const amountDubx: any = (
        document.getElementById("amount") as HTMLInputElement
      ).value!.trim();
      if (!addrTo) {
        setError("Please enter address to send.");
        throw Error("Please enter address to send");
      }
      if (!ethers.utils.isAddress(addrTo)) {
        setError('"Address To" is invalid');
        throw Error("Address To is invalid");
      }
      if (!amountDubx) {
        setError("Please enter amount to send");
        throw Error("Please enter amount to send");
      }
      if (parseFloat(amountDubx) >= parseFloat(balance)) {
        setError("Amount must be less then balance");
        throw Error("Amount must be less then balance");
      }

      if (
        addrTo &&
        ethers.utils.isAddress(addrTo) &&
        amountDubx &&
        parseFloat(amountDubx) <= parseFloat(balance)
      ) {
        setError("");
        const transaction = {
          to: addrTo,
          value: ethers.utils.parseEther(`${amountDubx}`),
        };
        setWaiting(true);

        const signedTransaction = await signer.sendTransaction(transaction);
        console.log("Transaction sent:", signedTransaction);

        setWaiting(false);
        setPendingTx(true);
        setShowLoading(true);
        setMinedTx(false);

        const receipt = await signedTransaction.wait();
        console.log("receipt", receipt);

        setPendingTx(false);
        setShowLoading(false);
        setMinedTx(true);
        const txnsInfo = await getTxsInfo(receipt.transactionHash);
        console.log(txnsInfo);
        setTxObject(txnsInfo);
        setIsSendHolderVisible(false);
        setHash(receipt.transactionHash);

        console.log("Transaction mined - Hash:", receipt.transactionHash);
      }
    } catch (error) {
      setWaiting(false);
      console.error("Error sending transaction:", error);
    }
  };

  const removeWalletClick = () => {
    history.push(`/delete/${address}`);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const toggleDivInfo = () => {
    setShowTxInfo((prevState) => !prevState);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const clearAll = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const addressToInput = document.getElementById(
      "addressTo"
    ) as HTMLInputElement;
    const amountInput = document.getElementById("amount") as HTMLInputElement;
    addressToInput.focus();

    if (addressToInput) {
      addressToInput.value = "";
    }

    if (amountInput) {
      amountInput.value = "";
    }

    setError("");
    setPendingTx(false);
    setMinedTx(false);
    setMinedTx(false);
    setHash("");
    setShowTxInfo(false);
    setWaiting(false);
    setTxObject({
      network: "",
      from: "",
      to: "",
      amount: "",
    });
  };
  //console.log(i18n.language);

  return (
    <IonPage dir={i18n.language === "ar" ? "rtl" : "ltr"}>
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
        <IonGrid className="ion-text-center ion-grid">
          <IonRow className="ion-row">
            <IonCol size="12" className="logo-text">
              <IonText color="primary">
                <h1
                  className="titleGradient"
                  style={{ textTransform: "uppercase" }}
                >
                  {t("Wallet detail")}
                </h1>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="page-container">
          {/* <div className="image-container">
            <img className="" src="ukras.webp" alt="Detail" />
          </div> */}

          <IonLabel>
            <div className="detail-holder">
              <IonText color="danger">
                <div className="label-text-wrapper sc-ion-input-md">
                  <div className="label-text sc-ion-input-md">
                    {t("Network")}
                  </div>
                </div>
              </IonText>
            </div>
            <IonText color="dark">
              <p>{currentNetwork}</p>
            </IonText>
            <div className="detail-holder mt20">
              <IonText color="danger">
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
                  <IonText color="danger">
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
                    color="dark"
                  ></IonIcon>
                </IonButton>
              </div>
            </div>
            <div className="detail-holder" style={{ marginTop: "20px" }}>
              <IonText color="danger">
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
          <div className="btn-holder">
            <IonButton
              onClick={togglePrivateKeyVisibility}
              className="btn-pr"
              style={{ width: "100px" }}
              color="sbtn"
            >
              {showPrivateKey ? t("Hide") : t("Show")}
            </IonButton>
            <IonButton className="btn-pr" onClick={copyPrivateKey} color="sbtn">
              {t("Copy Private Key")}
            </IonButton>
          </div>
          <hr className="hr" />

          <h2
            className="easySend mining-btn-toggle mb40 mt40"
            style={{ position: "relative" }}
            onClick={toggleSendHolder}
          >
            {t("EASY SEND")}
            <IonIcon
              slot="end"
              icon={openOutline}
              style={{ paddingLeft: "7px" }}
            ></IonIcon>
            <button className="clearall" id="btn-reset" onClick={clearAll}>
              Clear
            </button>
          </h2>
          <div
            className={`sendHolder item-card ${
              isSendHolderVisible ? "visible" : ""
            }`}
          >
            <div style={{ margin: "20px 10px 10px 10px" }}>
              <IonInput
                type="text"
                id="addressTo"
                style={{
                  fontSize: "14px",
                  display: "inline-block",
                  whiteSpace: "pre-line",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  hyphens: "auto",
                  width: "100%",
                }}
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
                // fill="outline"
                color="danger"
                onClick={sendDubx}
              >
                {t("Send")}
              </IonButton>
            </div>
          </div>
          {waiting && (
            <>
              <p className="error-message">
                <i>{t("Sending Tx ...")}</i>
              </p>
            </>
          )}
          {pendingTx && (
            <>
              <p className="error-message">
                <i>{t("Mining is in progress ...")}</i>
              </p>

              <ul className="dotted">
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </>
          )}
          {minedTx && (
            <div className="mt40 mb40">
              <p
                className="easySend ion-text-center mining-btn-toggle mt40"
                style={{
                  background: "transparent !important",
                  margin: "25px auto",
                }}
                color="light"
                onClick={toggleDivInfo}
              >
                {t("SHOW TX INFO")}
                <IonIcon
                  slot="end"
                  icon={arrowRedoOutline}
                  style={{ paddingLeft: "7px" }}
                ></IonIcon>
              </p>
              {showTxInfo && (
                <div
                  className="txHolder sendHolder1 item-card"
                  style={{ fontSize: "14px" }}
                >
                  <div style={{ margin: "10px" }}>
                    <p
                      className="mining-message-left"
                      style={{ display: "flex" }}
                    >
                      <span
                        style={{
                          color: "#fff",
                          fontWeight: "700",
                          display: "inline-block",
                          width: "75px",
                          minWidth: "75px",
                          maxWidth: "75px",
                        }}
                      >
                        TxHash:
                      </span>

                      <span
                        style={{ wordBreak: "break-all", marginLeft: "7px" }}
                      >
                        {hash}{" "}
                      </span>
                    </p>
                    <p
                      className="mining-message-left"
                      style={{ display: "flex" }}
                    >
                      <span
                        style={{
                          color: "#fff",
                          fontWeight: "700",
                          display: "inline-block",
                          width: "75px",
                          minWidth: "75px",
                          maxWidth: "75px",
                        }}
                      >
                        Network:
                      </span>{" "}
                      <span
                        style={{ wordBreak: "break-all", marginLeft: "7px" }}
                      >
                        {txObject.network}
                      </span>
                    </p>
                    <p
                      className="mining-message-left"
                      style={{ display: "flex" }}
                    >
                      <span
                        style={{
                          color: "#fff",
                          fontWeight: "700",
                          display: "inline-block",
                          width: "75px",
                          minWidth: "75px",
                          maxWidth: "75px",
                        }}
                      >
                        From:{" "}
                      </span>{" "}
                      <span
                        style={{ wordBreak: "break-all", marginLeft: "7px" }}
                      >
                        {txObject.from}
                      </span>
                    </p>
                    <p
                      className="mining-message-left"
                      style={{ display: "flex" }}
                    >
                      <span
                        style={{
                          color: "#fff",
                          fontWeight: "700",
                          display: "inline-block",
                          width: "75px",
                          minWidth: "75px",
                          maxWidth: "75px",
                        }}
                      >
                        To:{" "}
                      </span>{" "}
                      <span
                        style={{ wordBreak: "break-all", marginLeft: "7px" }}
                      >
                        {txObject.to}
                      </span>
                    </p>
                    <p
                      className="mining-message-left"
                      style={{ display: "flex" }}
                    >
                      <span
                        style={{
                          color: "#fff",
                          fontWeight: "700",
                          display: "inline-block",
                          width: "75px",
                          minWidth: "75px",
                          maxWidth: "75px",
                        }}
                      >
                        Amount:{" "}
                      </span>{" "}
                      <span
                        style={{
                          wordBreak: "break-all",
                          marginLeft: "7px",
                          marginRight: "7px",
                        }}
                      >
                        {txObject.amount}
                      </span>
                      DUBX
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="mt40">
            <IonButton
              onClick={removeWalletClick}
              color="danger"
              slot="end"
              className="btn-remove"
            >
              {i18n.language === "de" ? (
                <>
                  {t("wallet")}
                  <br />
                  {t("remove")}
                </>
              ) : (
                <>
                  {t("remove")}
                  <br />
                  {t("wallet")}
                </>
              )}
              <IonIcon
                slot="end"
                icon={trash}
                size="large"
                color="dark"
              ></IonIcon>
            </IonButton>
          </div>
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
