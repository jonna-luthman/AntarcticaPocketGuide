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
} from "@ionic/react";
import React, { FormEvent, useState } from "react";

import { useLoading } from "../context/LoadingContext";
import { checkPasswordsMatch } from "../utils/checkPasswordsMatch";
import { logoGoogle, chevronBackOutline } from "ionicons/icons";
import styles from "./styles/Auth.module.css";
import { AuthResult } from "../types/auth";

interface RegisterProps {
  nav: HTMLIonNavElement;
  signUpNewUser: (payload: {
    email: string;
    password: string;
    name: string;
  }) => Promise<AuthResult>;
  signUpWithGoogle: () => Promise<void>;
}

const Register: React.FC<RegisterProps> = ({
  nav,
  signUpNewUser,
  signUpWithGoogle,
}) => {
  const router = useIonRouter();
  const { showLoading, hideLoading } = useLoading();

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
        repeatPassword: "Passwords do not match",
      }));
      return;
    }

    showLoading();
    const response = await signUpNewUser(form);
    hideLoading();

    if (!response.success) {
      const errorCode = response.error.code;
      let message = "";

      switch (errorCode) {
        case "user_already_exists":
          message = "User already exists. Go to login.";
          break;
        case "weak_password":
          message = "Password is too weak (at least 6 charachters)";
          break;
        case "validation_failed":
          message = "Invalid email";
          break;
        case "over_email_send_rate_limit":
          message = "Too many requests. Try again in a few minutes.";
          break;
        default:
          message = response.error.message;
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
              <IonIcon slot="start" icon={chevronBackOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className={styles.center}>
          <IonText>
            <h2>Create account</h2>
          </IonText>
        </div>
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonInput
                className="ion-margin-top"
                name="name"
                label="Name"
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
                label="Email"
                placeholder="example@mail.com"
                className={
                  errors.email
                    ? "ion-invalid ion-margin-top"
                    : "ion-valid ion-margin-top"
                }
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
                className="ion-margin-top"
                label="Password"
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
                label="Repeat password"
                type="password"
                value={repeatPassword}
                labelPlacement="floating"
                className={
                  errors.repeatPassword
                    ? "ion-invalid ion-margin-top"
                    : "ion-valid ion-margin-top"
                }
                onIonInput={(event: Event) =>
                  setRepeatPassword((event.target as HTMLInputElement).value)
                }
              />
            </IonItem>
          </IonList>

          {errors && (
            <IonText color="danger" className="ion-padding">
              {errors.repeatPassword}
            </IonText>
          )}

          <IonButton
            className={styles.button}
            fill="outline"
            expand="block"
            type="submit"
          >
            Register
          </IonButton>
        </form>

        <hr className={styles.divider} />

        <div className={styles.center}>
          <IonButton
            expand="block"
            fill="solid"
            className={styles.googleButton}
            onClick={signUpWithGoogle}
          >
            <IonIcon slot="start" icon={logoGoogle} />
            Continue with Google
          </IonButton>

          <IonButton
            expand="block"
            fill="transparent"
            onClick={() => nav.pop()}
          >
            <IonText>
              Already have an account?<b> Log in </b>
            </IonText>
          </IonButton>
        </div>
      </IonContent>
    </>
  );
};

export default Register;
