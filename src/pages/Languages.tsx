import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonList,
  IonIcon,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import { arrowBackCircleOutline } from "ionicons/icons";
import "./Wallets.css";

interface LangStorage {
  language: string;
}

const Languages: React.FC = () => {
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useState<LangStorage>({ language: "en" });
  const [isEN, setIsEN] = useState(true);
  const [isES, setIsES] = useState(false);
  const [isAR, setIsAR] = useState(false);
  const [isDE, setIsDE] = useState(false);
  const [isRU, setIsRU] = useState(false);
  const [isPL, setIsPL] = useState(false);
  const [isSK, setIsSK] = useState(false);
  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setLang({ language });
    localStorage.setItem("language", JSON.stringify({ language }));
    if (language === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
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
      setIsAR(false);
      setIsDE(false);
      setIsRU(false);
      setIsPL(false);
      setIsSK(false);
    } else if (lang.language === "es") {
      setIsEN(false);
      setIsES(true);
      setIsAR(false);
      setIsDE(false);
      setIsRU(false);
      setIsPL(false);
      setIsSK(false);
    } else if (lang.language === "ar") {
      setIsAR(true);
      setIsDE(false);
      setIsEN(false);
      setIsES(false);
      setIsRU(false);
      setIsPL(false);
      setIsSK(false);
    } else if (lang.language === "de") {
      setIsEN(false);
      setIsES(false);
      setIsAR(false);
      setIsDE(true);
      setIsRU(false);
      setIsPL(false);
      setIsSK(false);
    } else if (lang.language === "ru") {
      setIsEN(false);
      setIsES(false);
      setIsAR(false);
      setIsDE(false);
      setIsRU(true);
      setIsPL(false);
      setIsSK(false);
    } else if (lang.language === "pl") {
      setIsEN(false);
      setIsES(false);
      setIsAR(false);
      setIsDE(false);
      setIsRU(false);
      setIsPL(true);
      setIsSK(false);
    } else if (lang.language === "sk") {
      setIsEN(false);
      setIsES(false);
      setIsAR(false);
      setIsDE(false);
      setIsRU(false);
      setIsPL(false);
      setIsSK(true);
    }
  }, [lang]);

  console.log(lang);
  return (
    <IonPage dir={lang.language === "ar" ? "rtl" : "ltr"}>
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
              <IonText color="primary">
                <h1
                  className="titleGradient"
                  style={{ textTransform: "uppercase" }}
                >
                  {t("Languages")}
                </h1>
                <p className="subtitleP">
                  {t("Choose your preferred language")}
                </p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>

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
                      setIsAR(false);
                      setIsDE(false);
                      setIsRU(false);
                      setIsPL(false);
                      setIsSK(false);
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
                      setIsAR(false);
                      setIsDE(false);
                      setIsRU(false);
                      setIsPL(false);
                      setIsSK(false);
                    }}
                  >
                    ES
                  </IonButton>
                  <IonButton
                    color={isAR ? "primary" : "medium"}
                    fill="outline"
                    expand="block"
                    className="mb"
                    onClick={() => {
                      handleChangeLanguage("ar");
                      setIsES(false);
                      setIsEN(false);
                      setIsAR(true);
                      setIsDE(false);
                      setIsRU(false);
                      setIsPL(false);
                      setIsSK(false);
                    }}
                  >
                    AR
                  </IonButton>
                  <IonButton
                    color={isDE ? "primary" : "medium"}
                    fill="outline"
                    expand="block"
                    className="mb"
                    onClick={() => {
                      handleChangeLanguage("de");
                      setIsES(false);
                      setIsEN(false);
                      setIsAR(false);
                      setIsDE(true);
                      setIsRU(false);
                      setIsPL(false);
                      setIsSK(false);
                    }}
                  >
                    DE
                  </IonButton>
                  <IonButton
                    color={isRU ? "primary" : "medium"}
                    fill="outline"
                    expand="block"
                    className="mb"
                    onClick={() => {
                      handleChangeLanguage("ru");
                      setIsES(false);
                      setIsEN(false);
                      setIsAR(false);
                      setIsDE(false);
                      setIsRU(true);
                      setIsPL(false);
                      setIsSK(false);
                    }}
                  >
                    RU
                  </IonButton>
                  <IonButton
                    color={isPL ? "primary" : "medium"}
                    fill="outline"
                    expand="block"
                    className="mb"
                    onClick={() => {
                      handleChangeLanguage("pl");
                      setIsES(false);
                      setIsEN(false);
                      setIsAR(false);
                      setIsDE(false);
                      setIsRU(false);
                      setIsPL(true);
                      setIsSK(false);
                    }}
                  >
                    PL
                  </IonButton>
                  <IonButton
                    color={isSK ? "primary" : "medium"}
                    fill="outline"
                    expand="block"
                    className="mb"
                    onClick={() => {
                      handleChangeLanguage("sk");
                      setIsES(false);
                      setIsEN(false);
                      setIsAR(false);
                      setIsDE(false);
                      setIsRU(false);
                      setIsPL(false);
                      setIsSK(true);
                    }}
                  >
                    SK
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
