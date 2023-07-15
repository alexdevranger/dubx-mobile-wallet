import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Wallets.css";

const Details: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Details page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>Hello from details</IonContent>
    </IonPage>
  );
};

export default Details;
