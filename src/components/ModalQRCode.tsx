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
  IonText,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { OverlayEventDetail } from "@ionic/core/components";
import { star, arrowBackCircleOutline } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import "./Modals.css";

interface ModalProps {
  isOpen: boolean;
  address: string;
  onDidDismiss: () => void;
}

const ModalQRCode: React.FC<ModalProps> = ({
  isOpen,
  address,
  onDidDismiss,
}) => {
  const history = useHistory();
  const [t, i18n] = useTranslation("global");
  const [error, setError] = useState<string | null>(null);
  const qrRef = useRef();
  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={address}
      size={200}
      bgColor={"#ffffff"}
      level={"H"}
    />
  );
  useEffect(() => {
    setError(null);
  }, [isOpen]);
  if (!address) {
    setError("Error Generating QR code.");
    throw Error("Error Generating QR code.");
  }

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      breakpoints={[0, 0.2, 0.5, 1]}
      initialBreakpoint={0.5}
      backdropBreakpoint={0.2}
    >
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
          <IonTitle>{t("Share QR Code")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>{address}</p>
        <div ref={qrRef} className="mt-3">
          {qrcode}
        </div>
        <IonText color="danger" style={{ textAlign: "center" }}>
          <p>{t("Share your address to receive DUBX.")}</p>
        </IonText>
        {error && <p className="error-message">{error}</p>}
      </IonContent>
    </IonModal>
  );
};

export default ModalQRCode;
