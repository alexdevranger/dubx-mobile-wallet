import React, { useState, useEffect } from "react";
import {
  IonLabel,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonText,
  IonToast,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { arrowBackCircleOutline } from "ionicons/icons";
import "./WalletDetailPage.css";

interface WalletRemovePage {
  address: string;
}

const WalletRemovePage: React.FC = () => {
  const { address } = useParams<WalletRemovePage>();

  const [t, i18n] = useTranslation("global");

  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      i18n.language === "ar" ? "rtl" : "ltr"
    );
  }, [i18n.language]);

  const walletsFromLocalStorage = JSON.parse(
    localStorage.getItem("wallets") || "[]"
  );

  const matchedWallet = walletsFromLocalStorage.find(
    (wallet: any) => wallet.address === address
  );

  const { name, privateKey } = matchedWallet || {};
  const copyPrivateKey = async () => {
    try {
      await navigator.clipboard.writeText(privateKey);
      setShowToast(true);
    } catch (error) {
      console.log("Error copying private key:", error);
    }
  };
  const deleteWallet = async () => {
    try {
      const walletIndex = walletsFromLocalStorage.findIndex(
        (wallet: any) => wallet.address === address
      );

      if (walletIndex !== -1) {
        walletsFromLocalStorage.splice(walletIndex, 1);

        localStorage.setItem(
          "wallets",
          JSON.stringify(walletsFromLocalStorage)
        );

        history.push("/wallets");
      } else {
        setError("Wallet not found");
      }
    } catch (error) {
      console.error("Error deleting wallet:", error);
    }
  };

  return (
    <IonPage dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{name}</IonTitle>
          <IonButton
            routerLink={`/wallets/${address}`}
            routerDirection="back"
            color="danger"
            slot="end"
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
                  {t("Delete Wallet")}
                </h1>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonLabel>
          <div className="detail-holder">
            <IonText color="danger">
              <div className="label-text-wrapper sc-ion-input-md">
                <div className="label-text sc-ion-input-md">{t("Name")}</div>
              </div>
            </IonText>
          </div>
          <IonText color="dark">
            <p>{name}</p>
          </IonText>
          <div className="detail-holder">
            <IonText color="danger">
              <div className="label-text-wrapper sc-ion-input-md">
                <div className="label-text sc-ion-input-md">{t("Address")}</div>
              </div>
            </IonText>
          </div>
          <IonText color="dark">
            <p>{address}</p>
          </IonText>
        </IonLabel>
        <div
          className="detail-holder center"
          style={{ marginTop: "30px", marginBottom: "15px" }}
        >
          <IonText className="error-message">
            <h2
              className="easySend warningH2 mt20"
              style={{
                position: "relative",
                fontWeight: "700",
                fontSize: "20px",
              }}
            >
              {t("WARNING")}
            </h2>
          </IonText>
        </div>
        <div className="detail-holder mt40">
          <IonText color="primary" className="warning-grey">
            <div className="label-text-wrapper">
              <div className="label-text">
                {t(
                  "If you want to delete your wallet, please be sure that you have saved your PRIVATE KEY."
                )}
              </div>
              <br />
              <div className="label-text">
                {t(
                  "Remember, deleting your wallet can result in permanent loss of access to your funds !!!"
                )}
              </div>
            </div>
          </IonText>
        </div>

        <div className="btn-holder mt40">
          <IonButton className="btn-pr" color="sbtn" onClick={copyPrivateKey}>
            {t("Copy Private Key")}
          </IonButton>
          <IonButton onClick={deleteWallet} className="btn-pr" color="sbtn">
            {t("DELETE ANYWAY")}
          </IonButton>
        </div>
        {error && <p className="error-message">{error}</p>}
        <IonToast
          isOpen={showToast}
          message={t("Copied")}
          duration={2000}
          cssClass="custom-toast"
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default WalletRemovePage;
