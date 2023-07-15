import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonButton,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";
import { add } from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";
import useWalletsService from "../hooks/useWalletsService";
import { NavButtons } from "../components/NavButtons";
import "./Wallets.css";

interface Novcanik {
  name: string;
  address: string;
  privateKey: string;
  password: string;
}

const Home: React.FC = () => {
  const [t, i18n] = useTranslation("global");
  const [data, setData] = useState({
    number: 0,
    difficultyFormated: 0,
  });
  const [novcanici, setNovcanici] = useState<Novcanik[]>([]);
  const createProvider = () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpctestnet.arabianchain.org",
      3270
    );
    return provider;
  };
  const { getWallets } = useWalletsService();
  const wallets = getWallets();
  //const existingWallets = JSON.parse(localStorage.getItem("wallets") || "[]");
  const history = useHistory();
  const location = useLocation();

  const newWallet = (): void => {
    //Redirect to the new wallet page
    history.push("/new-wallet");
  };
  const handleItemClick = (addr: string) => {
    // Navigate to the wallet detail page with the appropriate address
    history.push(`/wallets/${addr}`);
  };
  useEffect(() => {
    const getLanguageFromStorage = localStorage.getItem("language") || "";
    if (getLanguageFromStorage) {
      const storedLanguage = JSON.parse(getLanguageFromStorage)?.language;
      if (storedLanguage) {
        i18n.changeLanguage(storedLanguage);
      }
    } else {
      // If no language is stored in localStorage, set the default language to "en"
      localStorage.setItem("language", JSON.stringify({ language: "en" }));
    }
  }, []);

  // const handleChangeLanguage = (lang: string) => {
  //   i18n.changeLanguage(lang);
  // };
  useEffect(() => {
    const getWalletsFromStorage = localStorage.getItem("wallets");
    if (getWalletsFromStorage) {
      setNovcanici(JSON.parse(getWalletsFromStorage));
    }
    // const getWalletsFromStorage = async () => {
    //   const walletsFromLocalstorage = await JSON.parse(
    //     localStorage.getItem("wallets") || "[]"
    //   );
    //   setNovcanici(walletsFromLocalstorage);
    // };
    // getWalletsFromStorage();
    // const loadData = async () => {
    //   const url = `https://explorer.arabianchain.org/api/v1/network/stats/all`;
    //   const result = await fetch(url);
    //   const json = await result.json();
    //   setData(json[0]);
    // };
    // const getBlockInfo = async () => {
    //   const provider = await createProvider();
    //   const block = await provider.getBlock(14);
    //   console.log(block);
    // };
    // loadData();
    // getBlockInfo();
  }, [location.pathname]);
  console.log(data);
  console.log(wallets);
  console.log(novcanici);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("Wallets")}</IonTitle>
          <IonButtons slot="end">
            <NavButtons />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-content">
        {/* <IonList>
          <IonItem>Block Number: {data.number}</IonItem>
        </IonList>
        <IonList>
          <IonItem>Difficulty: {data.difficultyFormated}</IonItem>
        </IonList>
        <label>{t("OPEN_PASSWORD_TITLE")}:</label>
        <br />
        <IonButton color="tertiary" onClick={() => handleChangeLanguage("en")}>
          EN
        </IonButton>
        <IonButton
          color="medium"
          fill="outline"
          onClick={() => handleChangeLanguage("es")}
        >
          ES
        </IonButton> */}
        <IonGrid className="ion-text-center ion-grid">
          <IonRow className="ion-row">
            <IonCol size="12" className="logo-text">
              {/* <IonImg className="logo" src="logo192.png" /> */}
              <IonText color="secondary">
                <h1 className="titleGradient">{t("DUBX_WALLETS")}</h1>
                <p className="subtitleP">
                  {t("Click icon")} <span className="addButtonText">+</span>{" "}
                  {t("to import wallet")}
                </p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid className="ion-text-center ion-grid">
          <IonRow className="ion-row">
            <IonCol size="12">
              <IonList className="list-wallets">
                {novcanici.map((wallet, index) => (
                  <IonItem
                    key={index}
                    className="item-card"
                    onClick={() => handleItemClick(wallet.address)}
                  >
                    <IonLabel>
                      <div className="image-container">
                        <img
                          className="profile-image"
                          src={`https://effigy.im/a/${wallet.address}.png`}
                          alt="Profile"
                        />
                        <h2 className="wallName">{wallet.name}</h2>
                      </div>
                      <p>{wallet.address}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton id="myFabButton" onClick={newWallet}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
