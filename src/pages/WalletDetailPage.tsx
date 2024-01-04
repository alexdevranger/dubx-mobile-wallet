import { useEffect, useState } from "react";
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
  IonTextarea,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import ModalQRCode from "../components/ModalQRCode";
import ModalTXHistory from "../components/ModalTXHistory";
import NativeBarcodeScanner from "../components/NativeBarcodeScanner";
import { useTranslation } from "react-i18next";
import { ethers } from "ethers";
import { getBalance, createProvider, getTx } from "../utils/helper";
import { Clipboard } from "@capacitor/clipboard";

import {
  arrowBackCircleOutline,
  openOutline,
  arrowRedoOutline,
  trash,
  qrCodeOutline,
  reloadCircleSharp,
  colorFilter,
  documents,
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
  const [isModalTXOpen, setIsModalTXOpen] = useState(false);
  const [showTxInfo, setShowTxInfo] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [scannedAddress, setScannedAddress] = useState("");

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
  }, [location, minedTx, address, currentNetwork]);

  const clearFormFields = () => {
    const addressToInput = document.getElementById(
      "addressTo"
    ) as HTMLTextAreaElement;
    const amountInput = document.getElementById("amount") as HTMLInputElement;

    if (addressToInput) {
      addressToInput.value = "";
      setScannedAddress("");
    }

    if (amountInput) {
      amountInput.value = "";
    }

    setError("");
    setPendingTx(false);
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
  useEffect(() => {
    clearFormFields();
  }, [location, address, currentNetwork]);
  //console.log("balance", balance);
  const walletsFromLocalStorage = JSON.parse(
    localStorage.getItem("wallets") || "[]"
  );

  const matchedWallet = walletsFromLocalStorage.find(
    (wallet: any) => wallet.address === address
  );

  const { name, privateKey } = matchedWallet || {};
  const copyString = async (element: string) => {
    try {
      await Clipboard.write({
        string: element,
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

      console.log(addrTo);

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
          gasLimit: 90000,
          gasPrice: 20000000000,
        };
        setWaiting(true);
        setIsDisabled(true);

        const signedTransaction = await signer.sendTransaction(transaction);
        console.log("Transaction sent:", signedTransaction);
        if (savedNetwork === "testnet") {
          const savedTestnetTransactions: any =
            (await JSON.parse(localStorage.getItem("testnetTransactions"))) ||
            [];
          console.log("savedTestnetTransactions", savedTestnetTransactions);
          const txlength = savedTestnetTransactions.length;
          console.log("txlength", txlength);
          if (txlength === 5) {
            console.log("===5");
            await savedTestnetTransactions.shift();
            await savedTestnetTransactions.push(signedTransaction.hash);
            await localStorage.setItem(
              "testnetTransactions",
              JSON.stringify(savedTestnetTransactions)
            );
          } else {
            console.log("<5");
            await savedTestnetTransactions.push(signedTransaction.hash);
            await localStorage.setItem(
              "testnetTransactions",
              JSON.stringify(savedTestnetTransactions)
            );
          }
          console.log("savedTestnetTransactions", savedTestnetTransactions);
        }

        setWaiting(false);
        setPendingTx(true);
        setMinedTx(false);

        const receipt = await signedTransaction.wait();
        console.log("receipt", receipt);

        setPendingTx(false);
        setMinedTx(true);
        const txnsInfo = await getTxsInfo(receipt.transactionHash);
        console.log(txnsInfo);
        setTxObject(txnsInfo);
        setIsSendHolderVisible(false);
        setHash(receipt.transactionHash);
        setIsDisabled(false);
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
  const handleOpenTXModal = () => {
    setIsModalTXOpen(true);
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

  const handleScannedAddress = (address: string) => {
    setScannedAddress(address);
  };
  //console.log(i18n.language);
  //console.log("isDisabled", isDisabled);

  return (
    <IonPage dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ color: "#fff" }}>{name}</IonTitle>
          <IonButton
            onClick={() => history.goBack()}
            color="danger"
            slot="end"
            style={{ marginRight: "16px" }}
          >
            <IonIcon slot="start" icon={arrowBackCircleOutline}></IonIcon>
            {t("Back")}
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-content ion-padding">
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
              <p>
                {address}
                <IonIcon
                  slot="end"
                  icon={documents}
                  style={{ marginLeft: "10px" }}
                  onClick={() => copyString(address)}
                ></IonIcon>
              </p>
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
          <div className="btn-holder mb35">
            <IonButton
              onClick={togglePrivateKeyVisibility}
              className="btn-pr"
              style={{ width: "100px" }}
              color="sbtn"
            >
              {showPrivateKey ? t("Hide") : t("Show")}
            </IonButton>
            <IonButton
              className="btn-pr"
              onClick={() => copyString(privateKey)}
              color="sbtn"
            >
              {t("Copy Private Key")}
            </IonButton>
          </div>
          {/* <hr className="hr" /> */}

          <h2
            className="easySend mining-btn-toggle mx20"
            style={{ position: "relative" }}
            onClick={toggleSendHolder}
          >
            {t("EASY SEND")}
            <IonIcon
              slot="end"
              icon={openOutline}
              style={{ paddingLeft: "7px" }}
            ></IonIcon>
          </h2>
          <div className={`sendHolder ${isSendHolderVisible ? "visible" : ""}`}>
            <div style={{ margin: "20px 10px 10px 10px" }}>
              <div className="scanner-holder">
                <IonTextarea
                  id="addressTo"
                  className="address-input"
                  color="medium"
                  labelPlacement="stacked"
                  label={t("Address To")}
                  placeholder=""
                  value={scannedAddress}
                  onIonChange={(e) => setScannedAddress(e.detail.value!)}
                >
                  {" "}
                </IonTextarea>{" "}
                <span>
                  <NativeBarcodeScanner
                    onScannedAddress={handleScannedAddress}
                  />
                </span>
              </div>
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
                color="danger"
                onClick={sendDubx}
                disabled={isDisabled}
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
            <div className="mb40">
              <p
                className="easySend ion-text-center mining-btn-toggle mx20"
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
                        {t("TxHash")}:
                      </span>

                      <span
                        style={{ wordBreak: "break-all", marginLeft: "7px" }}
                        className="fs14"
                      >
                        {hash}{" "}
                        <IonIcon
                          slot="end"
                          icon={documents}
                          style={{ marginLeft: "10px" }}
                          onClick={() => copyString(hash)}
                        ></IonIcon>
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
                        {t("Network")}:
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
                        {t("From")}:
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
                        {t("To")}:
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
                        {t("Amount")}:
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

          <ModalQRCode
            isOpen={isModalOpen}
            address={address}
            onDidDismiss={() => setIsModalOpen(false)}
          />
          <ModalTXHistory
            isOpen={isModalTXOpen}
            address={address}
            onDidDismiss={() => setIsModalTXOpen(false)}
          />
          <IonToast
            isOpen={showToast}
            message={t("Copied")}
            duration={2000}
            cssClass="custom-toast"
            onDidDismiss={() => setShowToast(false)}
          />
        </div>
        <div className="btnsHolder">
          <button className="detail" onClick={handleOpenModal}>
            <IonIcon
              icon={qrCodeOutline}
              color="dark"
              style={{ fontSize: "20px" }}
            ></IonIcon>
            <p
              className="sc-ion-label-md-h sc-ion-label-md-s md btnsp"
              style={{ color: "#fff" }}
            >
              {t("Share")}
              <br /> {t("QR Code")}
            </p>
          </button>
          <button className="detail" onClick={handleOpenTXModal}>
            <IonIcon
              icon={colorFilter}
              color="dark"
              style={{ fontSize: "20px" }}
            ></IonIcon>
            <p
              className="sc-ion-label-md-h sc-ion-label-md-s md btnsp"
              style={{ color: "#fff" }}
            >
              {t("TX")}
              <br /> {t("History")}
            </p>
          </button>
          <button className="detail" onClick={clearFormFields}>
            <IonIcon
              icon={reloadCircleSharp}
              color="dark"
              style={{ fontSize: "20px" }}
            ></IonIcon>
            <p
              className="sc-ion-label-md-h sc-ion-label-md-s md btnsp"
              style={{ color: "#fff" }}
            >
              {t("Clear")}
              <br /> {t("Form")}
            </p>
          </button>
          <button className="detail" onClick={removeWalletClick}>
            <IonIcon
              icon={trash}
              color="dark"
              style={{ fontSize: "20px" }}
            ></IonIcon>
            <p
              className="sc-ion-label-md-h sc-ion-label-md-s md btnsp"
              style={{ color: "#fff" }}
            >
              {i18n.language === "de" ? (
                <>
                  {t("Wallet")}
                  <br />
                  {t("Remove")}
                </>
              ) : (
                <>
                  {t("Remove")}
                  <br />
                  {t("Wallet")}
                </>
              )}
            </p>
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WalletDetailPage;
