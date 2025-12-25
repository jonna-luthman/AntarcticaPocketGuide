import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonIcon,
  IonInputPasswordToggle,
  IonItem,
  IonList,
  useIonRouter,
  IonText,
  IonButtons,
  useIonToast,
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import React, { FormEvent, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";

import Register from "./register";
import ResetPassword from "./ResetPassword";

import styles from "./styles/Auth.module.css";

interface LoginProps {
  nav: any;
  setIsOpen: () => void;
}

const Login: React.FC<LoginProps> = ({ nav, setIsOpen }) => {
  const { showLoading, hideLoading } = useLoading();

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
            setError("Invalid email");
            break;
          case "invalid_credentials":
            setError("Incorrect email or password");
            break;
          case "user_not_found":
            setError("No user found with this email.");
            break;
          default:
            setError(response.error.message || "Unexpected error, try again.");
        }
        return;
      }

      hideLoading()
      showToast({
        message: "Welcome back!",
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
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className={styles.center}>
          <IonText>
            <h2>Log in</h2>
            <p>
              Welcome back! Log in to view your Field Notes and Add Sightings.
            </p>
          </IonText>
        </div>
        <div>
          <form onSubmit={handleSignIn}>
            <IonInput
              className="ion-margin-top"
              label="Email"
              type="email"
              labelPlacement="stacked"
              fill="outline"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value!)}
            />

            <IonInput
              className="ion-margin-top"
              label="Password"
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
                onClick={() =>
                  nav.push(() => (
                    <ResetPassword
                      nav={nav}
                      showLoading={showLoading}
                      hideLoading={hideLoading}
                    />
                  ))
                }
              >
                Forgot your password?
              </IonText>
            </p>

            <IonButton
              expand="block"
              type="submit"
              className={styles.button}
              fill="outline"
            >
              Continue
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
            Sign in with Google
          </IonButton>
        </div>

        <IonButton
          fill="transparent"
          expand="block"
          onClick={() =>
            nav.push(() => (
              <Register
                nav={nav}
                showLoading={showLoading}
                hideLoading={hideLoading}
                signUpNewUser={signUpNewUser}
                signUpWithGoogle={signInWithGoogle}
              />
            ))
          }
        >
          <IonText>
            Dont have an account?<b> Register here</b>
          </IonText>
        </IonButton>
      </IonContent>
    </>
  );
};

export default Login;
