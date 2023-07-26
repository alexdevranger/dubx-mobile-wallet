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
  IonText,
} from "@ionic/react";
import { useState, useEffect } from "react";
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

  const [novcanici, setNovcanici] = useState<Novcanik[]>([]);

  const { getWallets } = useWalletsService();
  const wallets = getWallets();
  const history = useHistory();
  const location = useLocation();

  const newWallet = (): void => {
    history.push("/new-wallet");
  };
  const handleItemClick = (addr: string) => {
    history.push(`/wallets/${addr}`);
  };
  const openNewWallet = () => {
    history.push(`/new-wallet`);
  };
  useEffect(() => {
    const getLanguageFromStorage = localStorage.getItem("language") || "";
    if (getLanguageFromStorage) {
      const storedLanguage = JSON.parse(getLanguageFromStorage)?.language;
      if (storedLanguage) {
        i18n.changeLanguage(storedLanguage);
      }
    } else {
      localStorage.setItem("language", JSON.stringify({ language: "en" }));
    }
  }, []);
  useEffect(() => {
    const getWalletsFromStorage = localStorage.getItem("wallets");
    if (getWalletsFromStorage) {
      setNovcanici(JSON.parse(getWalletsFromStorage));
    }
  }, [location.pathname]);
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
      <IonContent fullscreen className="ion-content  ion-padding">
        <IonGrid className="ion-text-center ion-grid">
          <IonRow className="ion-row">
            <IonCol size="12" className="logo-text">
              <IonText color="primary">
                <h1 className="titleGradient">{t("DUBX_WALLETS")}</h1>
                <p className="subtitleP">
                  {t("Click ")}{" "}
                  <span className="plus" onClick={openNewWallet}>
                    +
                  </span>
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
            <IonIcon icon={add} style={{ color: "#3d3d3d" }} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
