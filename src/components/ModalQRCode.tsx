import React, { useState, useEffect, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonModal,
  IonToast,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { Clipboard } from "@capacitor/clipboard";
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
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
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

  const copyAddress = async () => {
    try {
      await Clipboard.write({
        string: address,
      });
      setShowToast(true);
    } catch (error) {
      console.log("Error copying private key:", error);
    }
  };
  // const saveAsImage = (e: any) => {
  //   e.preventDefault();
  //   let canvas = qrRef.current.querySelector("canvas");
  //   console.log(canvas);
  //   const pngUrl = canvas.toDataURL("image/png");
  //   console.log(pngUrl);
  //   let anchor = document.createElement("a");
  //   anchor.href = pngUrl;
  //   anchor.download = `${address}.png`;
  //   document.body.appendChild(anchor);
  //   anchor.click();
  //   document.body.removeChild(anchor);
  // };
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      // breakpoints={[0, 0.2, 0.5, 1]}
      // initialBreakpoint={0.5}
      // backdropBreakpoint={0.2}
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
        {error && <p className="error-message">{error}</p>}

        <div className="btn-holder">
          <IonButton onClick={copyAddress} className="btn-pr" color="sbtn">
            {t("Copy Address")}
          </IonButton>
          {/* <IonButton className="btn-pr" color="sbtn" onClick={saveAsImage}>
            {t("Save as Image")}
          </IonButton> */}
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

export default ModalQRCode;
