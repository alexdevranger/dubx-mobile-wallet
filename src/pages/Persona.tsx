import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/react';

interface Person {
  email: string;
  firstname: string;
  lastname: string;
}

const Persona: React.FC = () => {
  const [person, setPerson] = useState<Person>({email: "", firstname: "", lastname: ""});

  const createRandomPerson = () => {
    const pName: string = (document.getElementById("personName") as HTMLInputElement).value;
    console.log(pName);
    const newPerson = {
      email: pName,
      firstname: Math.random().toString(36).substring(2, 11),
      lastname: Math.random().toString(36).substring(2, 11)
    };
    setPerson(newPerson);
    const existingPersons = JSON.parse(localStorage.getItem("persons") || "[]");
    existingPersons.push(newPerson);
    localStorage.setItem("persons", JSON.stringify(existingPersons));
  };
  console.log(person);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Random Person</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput id='personName' value={person.email} placeholder="Email" onIonChange={e => setPerson({...person, email: e.detail.value!})}></IonInput>
        <IonButton expand="full" onClick={createRandomPerson}>Create Random Person</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Persona;