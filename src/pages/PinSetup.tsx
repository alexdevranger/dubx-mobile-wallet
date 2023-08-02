import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonText,
  IonInput,
  IonImg,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import { backspace } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./LockScreen.css";

interface PinSetupProps {
  onPinSet: (pin: string) => void;
  onSkipSetup: () => void;
}

const PinSetup: React.FC<PinSetupProps> = ({ onPinSet, onSkipSetup }) => {
  const [t, i18n] = useTranslation("global");
  const [pin, setPin] = useState<string>("");
  const [confirmedPin, setConfirmedPin] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    const storedPinEnabled = localStorage.getItem("pinEnabled");
    if (storedPinEnabled) {
      localStorage.removeItem("pinEnabled");
    }
  }, []);

  const handleNumberClick = (number: string) => {
    if (pin.length < 4) {
      setPin((prevPin) => prevPin + number);
      setError("");
    }
  };

  const handleDeleteClick = () => {
    if (pin.length > 0) {
      setPin((prevPin) => prevPin.slice(0, -1));
    }
  };

  const handleConfirmPin = () => {
    if (pin.length === 4) {
      setConfirmedPin(pin);
      setPin("");
      setError("");
      setIsConfirming(true);
    }
  };

  const handleSetupComplete = () => {
    if (pin === confirmedPin) {
      localStorage.setItem("appPin", pin);
      setIsConfirming(false);
      onPinSet(pin);

      console.log(isConfirming);
      console.log(pin);
      history.push("/");
    } else {
      setError("PINs do not match. Please try again.");
      setPin("");
      setConfirmedPin("");
      setIsConfirming(false);
      console.log("some error");
    }
  };

  const skipAgain = () => {
    onSkipSetup();
    history.push("/");
  };

  console.log(pin);
  console.log(isConfirming);
  console.log(confirmedPin);
  console.log(error);

  return (
    <IonPage>
      <IonContent>
        <IonGrid className="ion-text-center ion-grid">
          <IonRow className="ion-row">
            <IonCol
              size="12"
              className="logo-text"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "40px",
              }}
            >
              <IonImg className="logo" src="logo192.png" />
              <IonText color="primary">
                <h1 className="titleGradient">{t("Set PIN")}</h1>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className="pin-setup-row">
            <IonCol className="ion-text-center">
              <IonText>{t("Enter a 4-digit PIN")}</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput
                type="password"
                value={pin}
                readonly={true}
                className="pin-display"
              />
            </IonCol>
          </IonRow>
          <IonRow style={{ marginTop: "40px" }}>
            <IonCol>
              <IonButton
                className="number-button"
                onClick={() => handleNumberClick("1")}
              >
                1
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                className="number-button"
                onClick={() => handleNumberClick("2")}
              >
                2
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                className="number-button"
                onClick={() => handleNumberClick("3")}
              >
                3
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                className="number-button"
                onClick={() => handleNumberClick("4")}
              >
                4
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                className="number-button"
                onClick={() => handleNumberClick("5")}
              >
                5
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                className="number-button"
                onClick={() => handleNumberClick("6")}
              >
                6
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                className="number-button"
                onClick={() => handleNumberClick("7")}
              >
                7
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                className="number-button"
                onClick={() => handleNumberClick("8")}
              >
                8
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                className="number-button"
                onClick={() => handleNumberClick("9")}
              >
                9
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                className="number-button"
                onClick={() => handleDeleteClick()}
              >
                {" "}
                <IonIcon
                  icon={backspace}
                  style={{ fontSize: "30px" }}
                ></IonIcon>
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                className="number-button"
                onClick={() => handleNumberClick("0")}
              >
                0
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                className="number-button"
                onClick={() => handleConfirmPin()}
                disabled={isConfirming}
              >
                OK
              </IonButton>
            </IonCol>
          </IonRow>
          {error && (
            <IonRow className="pin-setup-error flex-center">
              <IonText color="danger">
                <p>{error}</p>
              </IonText>
            </IonRow>
          )}
          {confirmedPin && (
            <IonRow className="pin-setup-row">
              <IonCol>
                <IonButton
                  className="confirm-button"
                  onClick={() => handleSetupComplete()}
                >
                  {t("Confirm PIN")}
                </IonButton>
              </IonCol>
            </IonRow>
          )}
          <IonRow className="pin-setup-row skip">
            <IonCol>
              <IonText color="medium">
                <b
                  style={{ marginBottom: "10px", cursor: "pointer" }}
                  onClick={skipAgain}
                >
                  {t("Skip PIN Setup")}
                </b>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PinSetup;
