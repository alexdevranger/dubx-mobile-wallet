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
                  {t("GOLD RULE: Copy Private Key ")}{" "}
                </p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonAccordionGroup>
          <IonAccordion value="newwallet">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("CREATE NEW WALLET")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>
                    {t(
                      "Click the PLUS icon on the Wallets page and then click the button 'Create New Wallet'. Give your wallet any name and confirm by clicking the button. You will be redirected to the wallets page with the newly created wallet."
                    )}
                  </p>
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
                  <p style={{ color: "#797979" }}>
                    {t(
                      "If you have the Private Key of your wallet, you can import it by clicking the PLUS icon on the wallets page and then the button 'IMPORT WALLET FROM PRIVATE KEY'. When the modal opens, enter a name for this wallet and the Private Key. After confirming, you will be redirected to the wallets page and see your imported wallet."
                    )}
                  </p>
                  <p style={{ color: "#797979" }}>
                    {t(
                      "If you have the Keystore and Password of your wallet, you can import it by clicking the PLUS icon on the wallets page and then the button 'IMPORT WALLET FROM KEYSTORE'. When the modal opens, click the button 'OPEN KEYSTORE', enter a name for this wallet, and the Password. After confirming, you will be redirected to the wallets page and see your imported wallet."
                    )}
                  </p>
                </div>
              </IonItem>
            </IonList>
          </IonAccordion>
          <IonAccordion value="network">
            <IonItem slot="header">
              <IonLabel color="medium">
                <b>{t("MAINNET vs TESTNET")}</b>
              </IonLabel>
              <IonIcon icon={ellipse} slot="start" color="primary" />
            </IonItem>
            <IonList slot="content">
              <IonItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#797979" }}>
                    {t(
                      "To test the wallet's features, click the Settings button and  choose TESTNET as an option. Then, go to"
                    )}{" "}
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
                  <p style={{ color: "#797979" }}>
                    {t(
                      "When you change the network to TESTNET on the Settings page, any actions you perform in the wallet will not affect your mainnet DUBX balance. To ensure a smooth experience, we recommend creating 2 new addresses when you first open the wallet. Obtain free TESTNET coins for one of these addresses and try sending them from one address to another."
                    )}
                  </p>
                  <p style={{ color: "#797979" }}>
                    {t(
                      "If you lose TESTNET coins, don't worry, you can always obtain new ones. Feel free to spend testnet coins as much as you wish, as we have plenty available for you. This way, you can become comfortable using the wallet safely on the  mainnet without any concerns about testnet coins."
                    )}
                  </p>
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
                  <p style={{ color: "#797979" }}>
                    {t(
                      "At the top of the Wallet Detail page, the Network status will indicate whether you are on Testnet or Mainnet. Based on this, you can fill out the form with the recipient's Address and the Amount you want to send in DUBX coins. During the sending process, you will receive real-time updates about the mining status of the transaction."
                    )}
                  </p>
                  <p style={{ color: "#797979" }}>
                    {t(
                      "Once the transaction is mined and confirmed, you can click  on the 'TX INFO' button to access all the relevant information about the transaction. This includes details such as the Transaction Hash, Block Number, Timestamp, Address From, Address To, and the sent Amount. You can easily copy this data by clicking the copy icon located on the right side of each field."
                    )}
                  </p>
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
                  <p style={{ color: "#797979" }}>
                    {t(
                      "If you are on the MAINNET network, you can find an icon at the bottom of the Wallet Detail Page. Clicking this icon will display the last 5 transactions for the specific wallet you are currently viewing. The transaction history is retrieved using an API and serves as a relevant source of information. You can copy all the data from each transaction by clicking the copy icon located on the right side of each field."
                    )}
                  </p>
                  <p style={{ color: "#797979" }}>
                    {t(
                      "On the other hand, if you are on the TESTNET network, you will see the last 5 transactions for all wallets. These transactions are stored locally in the mobile phone's storage. However, it's important to note that if you restart your phone or clear the cache, this TESTNET transaction history will be lost."
                    )}
                  </p>
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
                  <p style={{ color: "#797979" }}>
                    {t(
                      "This button is very useful for clearing all the data in the form, including the 'Address To,' 'Amount,' and 'TX INFO' fields. It essentially functions as a refresh button, allowing you to start anew when sending coins. Clicking this button will clear the existing data, providing a clean slate for your next transaction."
                    )}
                  </p>
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
                  <p style={{ color: "#797979" }}>
                    {t(
                      "To delete this wallet, click on the 'Remove Wallet' button. Please read the warning message carefully before proceeding with the deletion."
                    )}
                  </p>
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
                <b>{t("MANU")}</b>
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
