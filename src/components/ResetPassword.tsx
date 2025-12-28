import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonInput,
  IonButton,
  IonText,
  IonIcon,
} from "@ionic/react";
import React, { FormEvent, useState } from "react";
import { supabase } from "../api/supabaseClient";
import { useLoading } from "../context/LoadingContext";
import { chevronBackOutline } from "ionicons/icons";
import styles from "./styles/Auth.module.css";
import { useTranslation } from "react-i18next";

interface LoginProps {
  nav: HTMLIonNavElement;
}

const ResetPassword: React.FC<LoginProps> = ({ nav }) => {
  const { showLoading, hideLoading } = useLoading();
  const { t } = useTranslation();

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
       t('auth.phrases.resetPassword', { email: email })
      );
    } catch (error: any) {
      console.error("Supabase error: ", error);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="inherit">
          <IonButtons slot="start">
            <IonButton onClick={() => nav.pop()}>
              <IonIcon slot="start" icon={chevronBackOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className={styles.center}>
          <IonText>
            <h2>{t('auth.buttons.forgotPassword')}</h2>
            <p>
              {t('auth.phrases.forgotPassword')}
            </p>
          </IonText>
        </div>
        <div>
          {showForm && (
            <form onSubmit={handleReset}>
              <IonInput
                className="ion-margin-top"
                label={t('auth.form.email')}
                type="email"
                fill="outline"
                labelPlacement="stacked"
                placeholder="example@mail.com"
                value={email}
                onIonInput={(event: CustomEvent) =>
                  setEmail(event.detail.value)
                }
              />

              {error && (
                <IonText color="danger" className="ion-padding">
                  {error}
                </IonText>
              )}

              <IonButton
                className="ion-padding-vertical"
                color={"dark"}
                expand="block"
                type="submit"
              >
                {t('auth.buttons.send')}
              </IonButton>
            </form>
          )}

          {success && (
            <div className="ion-padding">
              <IonText color="success" className="ion-padding">
                {success}
              </IonText>

              {/* <div>
                <IonButton
                  expand="block"
                  fill="transparent"
                  onClick={() => nav.pop()}
                >
                  <IonText>Go back to log in</IonText>
                </IonButton>
              </div> */}
            </div>
          )}
        </div>
      </IonContent>
    </>
  );
};

export default ResetPassword;
