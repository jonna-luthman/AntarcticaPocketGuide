import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonInput,
  IonItem,
  IonIcon,
  IonList,
  IonButton,
  IonButtons,
  useIonRouter,
  IonText,
  useIonToast,
} from "@ionic/react";
import React, { FormEvent, useState } from "react";

import { checkPasswordsMatch } from "../../utils/checkPasswordsMatch";
import { logoGoogle, logoFacebook, chevronBackOutline } from "ionicons/icons";
import styles from "../styles/Auth.module.css";
import { AuthResult } from "../../types/auth";
import { useTranslation } from "react-i18next";

interface RegisterProps {
  nav: HTMLIonNavElement;
  signUpNewUser: (payload: {
    email: string;
    password: string;
    name: string;
  }) => Promise<AuthResult>;
  signUpWithGoogle: () => Promise<void>;
  signUpWithFacebook: () => Promise<void>;
}

const Register: React.FC<RegisterProps> = ({
  nav,
  signUpNewUser,
  signUpWithGoogle,
  signUpWithFacebook,
}) => {
  const router = useIonRouter();
  const { t } = useTranslation();
  const [showToast] = useIonToast();

  const [errors, setErrors] = useState({
    email: "",
    repeatPassword: "",
    form: "",
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({
      email: "",
      repeatPassword: "",
      form: "",
    });

    const validPassword = checkPasswordsMatch(form.password, repeatPassword);

    if (!validPassword) {
      setErrors((prev) => ({
        ...prev,
        repeatPassword: t("auth.form.passwordNotMatching"),
      }));
      return;
    }

    const response = await signUpNewUser(form);

    if (!response.success) {
      const errorCode = response.error.code;
      let message = "";

      switch (errorCode) {
        case "user_already_exists":
          message = t("errors.auth.user_already_exists");
          break;
        case "weak_password":
          message = t("errors.auth.weak_password");
          break;
        case "validation_failed":
          message = t("errors.auth.validation_failed");
          break;
        case "over_email_send_rate_limit":
          message = t("errors.auth.over_email_send_rate_limit");
          break;
        default:
          message = response.error.message || t("errors.auth.unexpectedError");
      }

      setErrors((prev) => ({ ...prev, form: message }));
      return;
    }
    router.push("/", "none");
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="inherit">
          <IonButtons slot="start">
            <IonButton onClick={() => nav.pop()}>
              <IonIcon slot="start" icon={chevronBackOutline} aria-hidden="true"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonList>
            <h2 className="ion-text-center">
              {t("auth.phrases.createAccountTitle")}
            </h2>
            <IonItem>
              <IonInput
                className="ion-margin-top"
                name="name"
                label={t("auth.form.name")}
                labelPlacement="floating"
                placeholder="John Smith"
                value={form.name}
                onIonInput={(event: CustomEvent) =>
                  setForm((prev) => ({
                    ...prev,
                    name: event.detail.value,
                  }))
                }
              />
            </IonItem>
            <IonItem>
              <IonInput
                type="email"
                name="email"
                label={t("auth.form.email")}
                placeholder="example@mail.com"
                labelPlacement="floating"
                value={form.email}
                onIonInput={(event: CustomEvent) =>
                  setForm((prev) => ({
                    ...prev,
                    email: event.detail.value,
                  }))
                }
              />
            </IonItem>

            <IonItem>
              <IonInput
                label={t("auth.form.password")}
                type="password"
                value={form.password}
                labelPlacement="floating"
                onIonInput={(event: CustomEvent) =>
                  setForm((prev) => ({
                    ...prev,
                    password: event.detail.value,
                  }))
                }
              />
            </IonItem>

            <IonItem>
              <IonInput
                label={t("auth.form.repeatPassword")}
                type="password"
                value={repeatPassword}
                labelPlacement="floating"
                onIonInput={(event: Event) =>
                  setRepeatPassword((event.target as HTMLInputElement).value)
                }
              />
            </IonItem>
          </IonList>

          {errors.repeatPassword && (
            <IonText color="danger" className="ion-padding">
              {errors.repeatPassword}
            </IonText>
          )}
          {errors.form && (
            <IonText color="danger" className="ion-padding">
              {errors.form}
            </IonText>
          )}

          <IonButton
            className={styles.button}
            shape="round"
            fill="solid"
            color="tertiary"
            expand="block"
            type="submit"
          >
            {t("auth.buttons.register")}
          </IonButton>
        </form>

        <hr className={styles.divider} />

        <div className={styles.center}>
          <IonButton
            expand="block"
            shape="round"
            fill="outline"
            color="dark"
            className={styles.googleButton}
            onClick={signUpWithGoogle}
          >
            <IonIcon slot="start" icon={logoGoogle} />
            {t("auth.buttons.continueWithGoogle")}
          </IonButton>

          <IonButton
            expand="block"
            shape="round"
            fill="outline"
            color="dark"
            className={styles.googleButton}
            onClick={signUpWithFacebook}
          >
            <IonIcon slot="start" icon={logoFacebook} />
            {t("auth.buttons.continueWithFacebook")}
          </IonButton>

          <IonButton expand="block" fill="clear" onClick={() => nav.pop()}>
            <IonText>
              {t("auth.buttons.loginPrompt")}
              <b> {t("auth.buttons.login")} </b>
            </IonText>
          </IonButton>
        </div>
      </IonContent>
    </>
  );
};

export default Register;
