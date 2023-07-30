import React, { useState, useEffect, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonModal,
  IonToast,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { ethers } from "ethers";
import { shortenAddress, shortenTxHash } from "../utils/helper";
import { createProvider } from "../utils/helper";
import { useHistory } from "react-router-dom";
import { Clipboard } from "@capacitor/clipboard";
import { reloadCircleOutline, documents } from "ionicons/icons";
import "./ModalTXHistory.css";

interface ModalProps {
  isOpen: boolean;
  address: string;
  onDidDismiss: () => void;
}
interface Transaction {
  from: string;
  to: string;
  value: string;
  timestamp: number;
  hash: string;
  blockNumber: number;
}

const ModalTXHistory: React.FC<ModalProps> = ({
  isOpen,
  address,
  onDidDismiss,
}) => {
  const history = useHistory();
  const [t, i18n] = useTranslation("global");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txns, setTxns] = useState<any[]>([]);
  const [testnetTransactions, setTestnetTransactions] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [network, setNetwork] = useState("");

  const testnetArrayObjects: Transaction[] = [];

  const getTestnetTxns = async (net: any) => {
    const provider = createProvider(net);
    const testnetTxs: any =
      (await JSON.parse(localStorage.getItem("testnetTransactions"))) || [];
    if (testnetTxs.length > 0) {
      await Promise.all(
        testnetTxs.map(async (txHash: any) => {
          const tx = await provider.getTransaction(txHash);
          // console.log("txxxxxxxxx", tx);
          let { from, to, blockNumber, hash } = tx;
          let block = await provider.getBlock(blockNumber);
          let timestamp = block.timestamp;
          let value = ethers.utils.formatEther(tx.value);
          const transactionObj: Transaction = {
            from,
            to,
            blockNumber,
            hash,
            timestamp,
            value,
          };
          testnetArrayObjects.push(transactionObj);
        })
      );
      testnetArrayObjects.sort((a, b) => b.timestamp - a.timestamp);
      //console.log(testnetArrayObjects);
      setTestnetTransactions(testnetArrayObjects);
    }
  };

  const fetchData = async () => {
    try {
      const url = `https://explorer.arabianchain.org/api/v1/address/tx/${address}/5/1`;
      const result = await fetch(url);
      const transactions = await result.json();
      setTxns(transactions);
      //console.log(transactions);
    } catch (error) {
      setTxns([]);
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const savedNetwork: any = localStorage.getItem("provider") || "testnet";
    setNetwork(savedNetwork);
    setError(null);
    if (network === "mainnet") {
      fetchData();
    } else if (network === "testnet") {
      getTestnetTxns("testnet");
    }
  }, [isOpen, network]);

  useEffect(() => {
    if (refreshing) {
      if (network === "mainnet") {
        fetchData();
      } else if (network === "testnet") {
        getTestnetTxns("testnet");
      }
      setRefreshing(false);
    }
    //console.log(testnetTransactions);
  }, [refreshing, network]);

  const isMainnet = network === "mainnet";
  const isTestnet = network === "testnet";

  const copyAddress = async (addr: string) => {
    try {
      await Clipboard.write({
        string: addr,
      });
      setShowToast(true);
    } catch (error) {
      console.log("Error copying private key:", error);
    }
  };
  const reloadAPI = () => {
    setRefreshing(true);
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
            {t("Back")}
          </IonButton>
          <IonTitle>
            {t("TX ")}
            {""}
            {t("History")}
          </IonTitle>
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
                  {t("Latest Transactions")}
                </h1>
                <p className="subtitleP">
                  {t("Network")}:{" "}
                  <span
                    style={{
                      color: "white",
                      textTransform: "uppercase",
                      fontWeight: "700",
                      marginLeft: "5px",
                    }}
                  >
                    {network}
                  </span>
                </p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div className="txHolder">
          {isMainnet && txns.length > 0 ? (
            <div
              className="flex"
              style={{
                background: "#8b50c7",
                marginBottom: "40px",
              }}
            >
              <div className="flex flex-wrap justify-center items-center mt-10">
                {txns.reverse().map((transaction, i) => (
                  <IonItem key={i} lines="none" className="white-glassmorphism">
                    <IonGrid>
                      <IonRow>
                        <IonCol
                          size="6"
                          style={{ paddingLeft: "0", paddingRight: "0" }}
                        >
                          <IonLabel color="primary">{t("TxHash")}:</IonLabel>
                          <IonLabel className="fs14">
                            {shortenTxHash(transaction.hash)}
                            <IonIcon
                              slot="end"
                              icon={documents}
                              style={{ marginLeft: "10px" }}
                              onClick={() => copyAddress(transaction.hash)}
                            ></IonIcon>
                          </IonLabel>
                        </IonCol>
                        <IonCol
                          size="6"
                          style={{ paddingLeft: "0", paddingRight: "0" }}
                        >
                          <IonLabel color="primary">
                            {t("BlockNumber")}:
                          </IonLabel>
                          <IonLabel className="fs14">
                            {transaction.blockNumber}
                          </IonLabel>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol
                          size="12"
                          style={{ paddingLeft: "0", paddingRight: "0" }}
                        >
                          <IonLabel color="primary">{t("From")}:</IonLabel>
                          <IonLabel
                            style={{ display: "flex" }}
                            className="fs14"
                          >
                            {shortenAddress(transaction.from)}
                            <IonIcon
                              slot="end"
                              icon={documents}
                              style={{ marginLeft: "10px" }}
                              onClick={() => copyAddress(transaction.from)}
                            ></IonIcon>
                          </IonLabel>
                        </IonCol>
                        <IonCol
                          size="12"
                          style={{ paddingLeft: "0", paddingRight: "0" }}
                        >
                          <IonLabel color="primary">{t("To")}:</IonLabel>
                          <IonLabel
                            style={{ display: "flex" }}
                            className="fs14"
                          >
                            {shortenAddress(transaction.to)}
                            <IonIcon
                              slot="end"
                              icon={documents}
                              style={{ marginLeft: "10px" }}
                              onClick={() => copyAddress(transaction.to)}
                            ></IonIcon>
                          </IonLabel>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol
                          size="6"
                          style={{ paddingLeft: "0", paddingRight: "0" }}
                        >
                          <IonLabel color="danger">{t("Amount")}:</IonLabel>
                          <IonLabel className="fs14">
                            {parseFloat(transaction.value).toFixed(4)} DUBX
                          </IonLabel>
                        </IonCol>
                        <IonCol
                          size="6"
                          style={{ paddingLeft: "0", paddingRight: "0" }}
                        >
                          <IonLabel color="medium">{t("Time&Date")}:</IonLabel>
                          <IonLabel className="fs14">
                            {moment(transaction.timestamp * 1000).format(
                              "DD/MM/YY HH:mm"
                            )}
                          </IonLabel>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonItem>
                ))}
              </div>
            </div>
          ) : null}
          {isMainnet && txns.length === 0 && (
            <div
              className="flex  mt40"
              style={{
                background: "#8b50c7",
                marginBottom: "40px",
              }}
            >
              <div className="flex flex-wrap justify-center items-center">
                <IonItem className="white-glassmorphism">
                  <IonGrid>
                    <IonRow>
                      <IonCol
                        size="12"
                        style={{ paddingLeft: "0", paddingRight: "0" }}
                      >
                        <div className="ion-text-center">
                          <IonLabel color="primary">
                            {t("No transactions")}
                          </IonLabel>
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonGrid>{" "}
                </IonItem>
              </div>
            </div>
          )}
          {isTestnet && testnetTransactions.length > 0 ? (
            <div
              className="flex"
              style={{
                background: "#8b50c7",
                marginBottom: "40px",
              }}
            >
              <div className="flex flex-wrap justify-center items-center mt-10">
                {testnetTransactions.reverse().map((transaction, i) => (
                  <IonItem key={i} lines="none" className="white-glassmorphism">
                    <IonGrid>
                      <IonRow>
                        <IonCol
                          size="6"
                          style={{ paddingLeft: "0", paddingRight: "0" }}
                        >
                          <IonLabel color="primary">{t("TxHash")}:</IonLabel>
                          <IonLabel className="fs14">
                            {shortenTxHash(transaction.hash)}
                            <IonIcon
                              slot="end"
                              icon={documents}
                              style={{ marginLeft: "10px" }}
                              onClick={() => copyAddress(transaction.hash)}
                            ></IonIcon>
                          </IonLabel>
                        </IonCol>
                        <IonCol
                          size="6"
                          style={{ paddingLeft: "0", paddingRight: "0" }}
                        >
                          <IonLabel color="primary">
                            {t("BlockNumber")}:
                          </IonLabel>
                          <IonLabel className="fs14">
                            {transaction.blockNumber}
                          </IonLabel>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol
                          size="12"
                          style={{ paddingLeft: "0", paddingRight: "0" }}
                        >
                          <IonLabel color="primary">{t("From")}:</IonLabel>
                          <IonLabel
                            style={{ display: "flex" }}
                            className="fs14"
                          >
                            {shortenAddress(transaction.from)}
                            <IonIcon
                              slot="end"
                              icon={documents}
                              style={{ marginLeft: "10px" }}
                              onClick={() => copyAddress(transaction.from)}
                            ></IonIcon>
                          </IonLabel>
                        </IonCol>
                        <IonCol
                          size="12"
                          style={{ paddingLeft: "0", paddingRight: "0" }}
                        >
                          <IonLabel color="primary">{t("To")}:</IonLabel>
                          <IonLabel
                            style={{ display: "flex" }}
                            className="fs14"
                          >
                            {shortenAddress(transaction.to)}
                            <IonIcon
                              slot="end"
                              icon={documents}
                              style={{ marginLeft: "10px" }}
                              onClick={() => copyAddress(transaction.to)}
                            ></IonIcon>
                          </IonLabel>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol
                          size="6"
                          style={{ paddingLeft: "0", paddingRight: "0" }}
                        >
                          <IonLabel color="danger">{t("Amount")}:</IonLabel>
                          <IonLabel className="fs14">
                            {parseFloat(transaction.value).toFixed(4)} DUBX
                          </IonLabel>
                        </IonCol>
                        <IonCol
                          size="6"
                          style={{ paddingLeft: "0", paddingRight: "0" }}
                        >
                          <IonLabel color="medium">{t("Time&Date")}:</IonLabel>
                          <IonLabel className="fs14">
                            {moment(transaction.timestamp * 1000).format(
                              "DD/MM/YY HH:mm"
                            )}
                          </IonLabel>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonItem>
                ))}
              </div>
            </div>
          ) : null}
          {isTestnet && testnetTransactions.length === 0 && (
            <div
              className="flex  mt40"
              style={{
                background: "#8b50c7",
                marginBottom: "40px",
              }}
            >
              <div className="flex flex-wrap justify-center items-center">
                <IonItem className="white-glassmorphism">
                  <IonGrid>
                    <IonRow>
                      <IonCol
                        size="12"
                        style={{ paddingLeft: "0", paddingRight: "0" }}
                      >
                        <div className="ion-text-center">
                          <IonLabel color="primary">
                            {t("No testnet transactions")}
                          </IonLabel>
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonGrid>{" "}
                </IonItem>
              </div>
            </div>
          )}
          <div
            className="btn-holder"
            style={{
              marginBottom: "40px",
            }}
          >
            <IonButton className="btn-pr" onClick={reloadAPI} color="sbtn">
              {t("Refresh Transactions")}
              <IonIcon slot="end" icon={reloadCircleOutline} />
            </IonButton>
          </div>
        </div>
        <IonToast
          isOpen={showToast}
          message="Copied"
          duration={2000}
          cssClass="custom-toast"
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonModal>
  );
};

export default ModalTXHistory;
