import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonInput,
  IonIcon,
  IonInputPasswordToggle,
  IonText,
  IonButtons,
  useIonToast,
  IonPage,
} from "@ionic/react";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import React, { FormEvent, useRef, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import styles from "../styles/Auth.module.css";
import { useTranslation } from "react-i18next";

interface LoginProps {
  nav: HTMLIonNavElement;
  setIsOpen: (isOpen: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ nav, setIsOpen }) => {
  const { t } = useTranslation();
  const [showToast] = useIonToast();
  const {
    signInWithEmail,
    signInWithGoogle,
    signInWithFacebook,
    signUpNewUser,
  } = UserAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");


  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await signInWithEmail({ email, password });

      if (!response.success) {
        const errorCode = response.error.code;
        switch (errorCode) {
          case "validation_failed":
            setError(t("errors.auth.validation_failed"));
            break;
          case "invalid_credentials":
            setError(t("errors.auth.invalid_credentials"));
            break;
          case "user_not_found":
            setError(t("errors.auth.user_not_found"));
            break;
          default:
            setError(response.error.message || t("errors.auth.user_not_found"));
        }

        return;
      }

      return response.data;
    } catch (error: any) {
      console.error("An error unexpected error occured: ", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="inherit">
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>
              {t("buttons.close")}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div>
          <form onSubmit={handleSignIn}>
            <div className={styles.center}>
              <h2>{t("auth.phrases.loginTitle")}</h2>
              <p>{t("auth.phrases.login")}</p>
            </div>
            <IonInput
              className="ion-margin-top"
              label={t("auth.form.email")}
              type="email"
              labelPlacement="stacked"
              fill="outline"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value!)}
            />

            <IonInput
              className="ion-margin-top"
              label={t("auth.form.password")}
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
              shape="round"
              type="submit"
              className={styles.button}
              fill="solid"
              color="tertiary"
            >
              {t("auth.buttons.continue")}
            </IonButton>
          </form>
        </div>

        <hr className={styles.divider} />

        <div>
          <IonButton
            expand="block"
            shape="round"
            fill="outline"
            color="dark"
            className={styles.googleButton}
            onClick={signInWithGoogle}
          >
            <IonIcon slot="start" icon={logoGoogle} aria-hidden="true"/>
            {t("auth.buttons.continueWithGoogle")}
          </IonButton>
        </div>

        <div>
          <IonButton
            expand="block"
            shape="round"
             fill="outline"
            color="dark"
            className={styles.googleButton}
            onClick={signInWithFacebook}
          >
            <IonIcon slot="start" icon={logoFacebook} aria-hidden="true"/>
            {t("auth.buttons.continueWithFacebook")}
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
                signUpWithFacebook={signInWithFacebook}
              />
            ))
          }
        >
          <IonText>
            {t("auth.buttons.registerPrompt")}
            <b> {t("auth.buttons.registerHere")}</b>
          </IonText>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
