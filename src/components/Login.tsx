import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonInput,
  IonIcon,
  IonInputPasswordToggle,
  useIonRouter,
  IonText,
  IonButtons,
  useIonToast,
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import React, { FormEvent, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";

import Register from "./Register";
import ResetPassword from "./ResetPassword";

import styles from "./styles/Auth.module.css";
import { useTranslation } from "react-i18next";

interface LoginProps {
  nav: HTMLIonNavElement;
  setIsOpen: (isOpen: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ nav, setIsOpen }) => {
  const { showLoading, hideLoading } = useLoading();
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [introSeen, setIntroSeen] = useState<boolean>(false);

  const { signInWithEmail, signInWithGoogle, signUpNewUser } = UserAuth();
  const [showToast] = useIonToast();

  const router = useIonRouter();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    showLoading();
    try {
      const response = await signInWithEmail({ email, password });

      if (!response.success) {
        const errorCode = response.error.code;
        switch (errorCode) {
          case "validation_failed":
            setError(t('errors.auth.validation_failed'));
            break;
          case "invalid_credentials":
            setError(t('errors.auth.invalid_credentials'));
            break;
          case "user_not_found":
            setError(t('errors.auth.user_not_found'));
            break;
          default:
            setError(response.error.message || t('errors.auth.user_not_found'));
        }
        return;
      }

      hideLoading();
      showToast({
        message: t('toasts.login.welcomeBack'),
        duration: 2000,
        color: "dark",
        position: "bottom",
      });

      return response.data;
    } catch (error: any) {
      setError(error);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="inherit">
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>{t('buttons.close')}</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className={styles.center}>
          <IonText>
            <h2>{t('auth.phrases.loginTitle')}</h2>
            <p>
              {t('auth.phrases.login')}
            </p>
          </IonText>
        </div>
        <div>
          <form onSubmit={handleSignIn}>
            <IonInput
              className="ion-margin-top"
              label={t('auth.form.email')}
              type="email"
              labelPlacement="stacked"
              fill="outline"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value!)}
            />

            <IonInput
              className="ion-margin-top"
              label={t('auth.form.password')}
              type="password"
              labelPlacement="stacked"
              fill="outline"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>

            {error && (
              <IonText color="danger" className="ion-padding">
                {error}
              </IonText>
            )}

            <p className={styles.right}>
              <IonText
                onClick={() => nav.push(() => <ResetPassword nav={nav} />)}
              >
                {t('auth.buttons.forgotPassword')}
              </IonText>
            </p>

            <IonButton
              expand="block"
              type="submit"
              className={styles.button}
              fill="outline"
            >
              {t('auth.buttons.continue')}
            </IonButton>
          </form>
        </div>

        <hr className={styles.divider} />

        <div>
          <IonButton
            expand="block"
            fill="solid"
            className={styles.googleButton}
            onClick={signInWithGoogle}
          >
            <IonIcon slot="start" icon={logoGoogle} />
            {t('auth.buttons.continueWithGoogle')}
          </IonButton>
        </div>

        <IonButton
          fill="clear"
          expand="block"
          onClick={() =>
            nav.push(() => (
              <Register
                nav={nav}
                signUpNewUser={signUpNewUser}
                signUpWithGoogle={signInWithGoogle}
              />
            ))
          }
        >
          <IonText>
            {t('auth.buttons.registerPrompt')}<b> {t('auth.buttons.registerHere')}</b>
          </IonText>
        </IonButton>
      </IonContent>
    </>
  );
};

export default Login;
