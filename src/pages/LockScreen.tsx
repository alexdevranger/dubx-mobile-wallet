import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonImg,
  IonText,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import { backspace } from "ionicons/icons";
import "./LockScreen.css";

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [t, i18n] = useTranslation("global");
  const [pin, setPin] = useState<string>("");
  const [showIncorrectPin, setShowIncorrectPin] = useState<boolean>(false);

  const handleNumberClick = (number: string) => {
    if (pin.length < 4) {
      setPin((prevPin) => prevPin + number);
      setShowIncorrectPin(false);
    }
  };

  const handleDeleteClick = () => {
    if (pin.length > 0) {
      setPin((prevPin) => prevPin.slice(0, -1));
      setShowIncorrectPin(false);
    }
  };

  const handleUnlock = () => {
    const storedPin = localStorage.getItem("appPin");
    if (pin === storedPin) {
      setPin("");
      onUnlock();
    } else {
      setShowIncorrectPin(true);
      setPin("");
      setTimeout(() => {
        setShowIncorrectPin(false);
      }, 1500);
    }
  };

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
                <h1 className="titleGradient">{t("Enter PIN")}</h1>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className="lock-screen-row">
            <IonCol className="lock-screen-col" size="3">
              {pin.length >= 1 ? (
                <div className="lock-screen-circle-filled" />
              ) : (
                <div className="lock-screen-circle" />
              )}
            </IonCol>
            <IonCol className="lock-screen-col" size="3">
              {pin.length >= 2 ? (
                <div className="lock-screen-circle-filled" />
              ) : (
                <div className="lock-screen-circle" />
              )}
            </IonCol>
            <IonCol className="lock-screen-col" size="3">
              {pin.length >= 3 ? (
                <div className="lock-screen-circle-filled" />
              ) : (
                <div className="lock-screen-circle" />
              )}
            </IonCol>
            <IonCol className="lock-screen-col" size="3">
              {pin.length >= 4 ? (
                <div className="lock-screen-circle-filled" />
              ) : (
                <div className="lock-screen-circle" />
              )}
            </IonCol>
          </IonRow>
          {/* {showIncorrectPin && ( */}
          <IonRow
            className={`lock-screen-alert ${showIncorrectPin ? "show" : ""}`}
          >
            <p>{t("Incorrect PIN. Please try again.")}</p>
          </IonRow>
          {/* )} */}
          <IonRow style={{ marginTop: "40px" }}>
            <IonCol>
              <button
                className="number-button"
                onClick={() => handleNumberClick("1")}
              >
                1
              </button>
            </IonCol>
            <IonCol>
              <button
                className="number-button"
                onClick={() => handleNumberClick("2")}
              >
                2
              </button>
            </IonCol>
            <IonCol>
              <button
                className="number-button"
                onClick={() => handleNumberClick("3")}
              >
                3
              </button>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <button
                className="number-button"
                onClick={() => handleNumberClick("4")}
              >
                4
              </button>
            </IonCol>
            <IonCol>
              <button
                className="number-button"
                onClick={() => handleNumberClick("5")}
              >
                5
              </button>
            </IonCol>
            <IonCol>
              <button
                className="number-button"
                onClick={() => handleNumberClick("6")}
              >
                6
              </button>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <button
                className="number-button"
                onClick={() => handleNumberClick("7")}
              >
                7
              </button>
            </IonCol>
            <IonCol>
              <button
                className="number-button"
                onClick={() => handleNumberClick("8")}
              >
                8
              </button>
            </IonCol>
            <IonCol>
              <button
                className="number-button"
                onClick={() => handleNumberClick("9")}
              >
                9
              </button>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <button className="ok" onClick={() => handleDeleteClick()}>
                {" "}
                <IonIcon
                  icon={backspace}
                  style={{ fontSize: "30px" }}
                ></IonIcon>
              </button>
            </IonCol>
            <IonCol>
              <button
                className="number-button"
                onClick={() => handleNumberClick("0")}
              >
                0
              </button>
            </IonCol>
            <IonCol>
              <button className="ok" onClick={() => handleUnlock()}>
                OK
              </button>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LockScreen;
