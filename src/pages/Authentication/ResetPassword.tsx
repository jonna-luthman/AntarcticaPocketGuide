import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonText,
} from "@ionic/react";
import React, { FormEvent, useState } from "react";
import { supabase } from "../../api/supabaseClient";
import { useLoading } from "../../context/LoadingContext";

const ResetPassword: React.FC = () => {
  const { showLoading, hideLoading } = useLoading();

  const [showForm, setShowForm] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    try {
      showLoading();
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        setError(error.message);
        hideLoading();
        return;
      }

      setShowForm(false);
      setSuccess(
        `An email have been sent to "${email}" with a reset password link.`
      );
    } catch (error: any) {
      console.error("Supabase error: ", error);
    } finally {
      hideLoading();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Reset password</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen scrollY={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Reset your password</IonTitle>
          </IonToolbar>
        </IonHeader>
        {showForm && (
          <form onSubmit={handleReset}>
            <IonInput
              label="Email"
              type="email"
              labelPlacement="stacked"
              placeholder="example@mail.com"
              value={email}
              onIonInput={(event: CustomEvent) => setEmail(event.detail.value)}
            />
            {error && (
                <IonText color="danger" className="ion-padding">
                  {error.message}
                </IonText>
              )}
            <IonButton
              color={"dark"}
              className="ion-margin-top"
              expand="block"
              type="submit"
            >
              Send
            </IonButton>
          </form>
        )}
        {success && (
          <IonText color="success" className="ion-padding">
            {success}
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ResetPassword;
