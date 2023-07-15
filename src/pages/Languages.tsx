import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { NavButtons } from "../components/NavButtons";
import { useTranslation } from "react-i18next";
import {
  star,
  arrowBackCircleOutline,
  openOutline,
  arrowRedoOutline,
  trash,
  qrCodeOutline,
  refreshCircleOutline,
} from "ionicons/icons";
import "./Wallets.css";

interface LangStorage {
  language: string;
}

const Languages: React.FC = () => {
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useState<LangStorage>({ language: "en" });
  const [isEN, setIsEN] = useState(true);
  const [isES, setIsES] = useState(false);
  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setLang({ language });
    localStorage.setItem("language", JSON.stringify({ language }));
  };
  useEffect(() => {
    const getLanguageFromStorage = localStorage.getItem("language") || "";
    if (getLanguageFromStorage) {
      const storedLanguage = JSON.parse(getLanguageFromStorage)?.language;
      if (storedLanguage) {
        setLang({ language: storedLanguage });
        i18n.changeLanguage(storedLanguage);
      }
    } else {
      // If no language is stored in localStorage, set the default language to "en"
      setLang({ language: "en" });
      localStorage.setItem("language", JSON.stringify({ language: "en" }));
    }
  }, []);

  useEffect(() => {
    if (lang.language === "en") {
      setIsEN(true);
      setIsES(false);
    } else if (lang.language === "es") {
      setIsEN(false);
      setIsES(true);
    }
  }, [lang]);

  console.log(lang);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("Languages")}</IonTitle>
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
      <IonContent fullscreen className="ion-content">
        <IonGrid className="ion-text-center ion-grid">
          <IonRow className="ion-row">
            <IonCol size="12" className="logo-text">
              {/* <IonImg className="logo" src="logo192.png" /> */}
              <IonText color="secondary">
                <h1
                  className="titleGradient"
                  style={{ textTransform: "uppercase" }}
                >
                  {t("Languages")}
                </h1>
                <p className="subtitleP">
                  {t("Choose your preferred language")}
                </p>
                {/* <p className="subtitleP">Select desired language</p> */}
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
        {/* <IonGrid className="ion-text-center ion-grid">
          <IonRow className="ion-row">
            <IonCol size="12">
              <IonList className="list-wallets">
                <IonItem
                  className="item-card"
                  style={{ width: "50%", textAlign: "center", margin: "auto" }}
                >
                  <div className="langHolder">
                    <IonButton
                      color={isEN ? "primary" : "medium"}
                      fill="outline"
                      onClick={() => {
                        handleChangeLanguage("en");
                        setIsEN(true);
                        setIsES(false);
                      }}
                    >
                      EN
                    </IonButton>
                    <IonLabel>
                      <h2 className="wallName">English</h2>
                    </IonLabel>
                  </div>
                </IonItem>
                <IonItem
                  className="item-card"
                  style={{
                    width: "50%",
                    textAlign: "center",
                    margin: "auto",
                    marginTop: "20px",
                  }}
                >
                  <div className="langHolder">
                    <IonButton
                      color={isES ? "primary" : "medium"}
                      fill="outline"
                      onClick={() => {
                        handleChangeLanguage("es");
                        setIsES(true);
                        setIsEN(false);
                      }}
                    >
                      ES
                    </IonButton>
                    <IonLabel>
                      <h2 className="wallName">Espanjol</h2>
                    </IonLabel>
                  </div>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid> */}
        <IonGrid className="ion-text-center ion-grid">
          <IonRow className="ion-row">
            <IonCol size="12">
              <IonList className="list-wallets">
                <div className="ion-text-center flex-lang">
                  <IonButton
                    color={isEN ? "primary" : "medium"}
                    fill="outline"
                    className="mb"
                    expand="block"
                    onClick={() => {
                      handleChangeLanguage("en");
                      setIsEN(true);
                      setIsES(false);
                    }}
                  >
                    EN
                  </IonButton>
                  <IonButton
                    color={isES ? "primary" : "medium"}
                    fill="outline"
                    expand="block"
                    className="mb"
                    onClick={() => {
                      handleChangeLanguage("es");
                      setIsES(true);
                      setIsEN(false);
                    }}
                  >
                    ES
                  </IonButton>
                </div>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Languages;
