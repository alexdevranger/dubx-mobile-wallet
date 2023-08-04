import {
  IonAccordion,
  IonAccordionGroup,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonContent,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import { NavButtons } from "../components/NavButtons";
import { ellipse, triangle, square, happyOutline } from "ionicons/icons";
const FAQ: React.FC = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("FAQ")}</IonTitle>
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
                <h1 className="titleGradient">{t("WALLET GUIDE")}</h1>
                <p className="subtitleP">
                  {t("GOLDEN RULE: Copy Private Key ")}{" "}
                </p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonAccordionGroup>
          <IonAccordion value="newwallet">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("CREATE_NEW")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>{t("Click_PLUS")}</p>
                  <p style={{ color: "#797979" }}>
                    {t(
                      "Before making any deposits to this address, copy and securely export your private key. We don't hold or keep your private keys. They are stored only in the local storage of your cell phone."
                    )}
                  </p>
                  <p style={{ color: "#797979" }}>
                    {t(
                      "If you restart your phone, delete cache or lose your phone, you will lose all your funds if you didn't save your private key. If your private key is saved, you can use it with"
                    )}
                    <a
                      href="https://galaxy.arabianchain.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      &nbsp;Galaxy wallet{" "}
                    </a>{" "}
                    {t("or desktop wallet to access your funds.")}
                  </p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="existing">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("Import Existing Wallet")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>{t("IMPORT_PRIVATE KEY")}</p>
                  <p style={{ color: "#797979" }}>{t("Keystore_Password")}</p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="network">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("Mainnet vs Testnet")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>
                    {t("testWalletFeatures")}{" "}
                    <a
                      href="https://faucet.arabianchain.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      faucet
                    </a>{" "}
                    {t(
                      "to get free testnet coins. Copy the address from your mobile wallet and paste it in the faucet. You will receive 2 TESTNET DUBX coins."
                    )}
                  </p>
                  <p style={{ color: "#797979" }}>
                    {t(
                      "You can use all your addresses for both mainnet and testnet. When you are on the testnet network, you will see the balance of TESTNET DUBX COINS, and when you are on the mainnet, you will see the real balance of DUBX."
                    )}
                  </p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>

          <IonAccordion value="testnet">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("Send TESTNET coins")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>{t("network_TESTNET.")}</p>
                  <p style={{ color: "#797979" }}>{t("loseTESTNET")}</p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="easy_send">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("EASY SEND")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>{t("Network_status")}</p>
                  <p style={{ color: "#797979" }}>{t("TXINFO_history")}</p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="setup_PIN">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("Setup_PIN")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>{t("First_opening")}</p>
                  <p style={{ color: "#797979" }}>{t("How to setup PIN")}</p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="saved_PIN">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("Where is PIN saved")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>{t("Saved_PIN")}</p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="skipped_PIN">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("Skip PIN Setup")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>{t("Skip_PIN")}</p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="remove_PIN">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("How to remove PIN")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>{t("Remove_PIN")}</p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="change_PIN">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("Change_PIN_code")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>{t("Change_PIN_with_new")}</p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="unlock_PIN">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("Unlock_wallet")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>{t("Unlock")}</p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="reenable_PIN">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("I_skipped")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>{t("Reenable")}</p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="share">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("Share QR Code")} </b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>
                    {t(
                      "At the bottom of the Wallet Detail Page, you can click on the icon to share the QR Code of your wallet's address. Additionally, you have the option to copy your wallet's address if needed."
                    )}
                  </p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="history">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>
                  {" "}
                  {t("TX ")}
                  {t("History")}
                </b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>{t("Wallet_Detail_Page")}</p>
                  <p style={{ color: "#797979" }}>{t("TESTNET_tx")}</p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="clear">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b> {t("Clear Form")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>{t("clearing")}</p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="remove">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>
                  {t("Remove")} {t("Wallet")}{" "}
                </b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>{t("delete_wallet")}</p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="language">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("CHANGE LANGUAGE")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>
                    {t(
                      "Choose your preferred language by clicking the 'Settings' button and then find the button with the language of your choice."
                    )}
                  </p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="manu">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("MENU")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>
                    {t(
                      "Besides the links for the 'Wallets' and 'Settings' pages, here you can find the current status of the network and language settings."
                    )}
                  </p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};
export default FAQ;
