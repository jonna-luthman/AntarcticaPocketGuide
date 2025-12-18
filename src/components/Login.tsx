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
} from "@ionic/react";
import React, { FormEvent, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import Register from "./register";
import ResetPassword from "./ResetPassword";

interface LoginProps {
  nav: any;
}

const Login: React.FC = ({ nav }) => {
  const { showLoading, hideLoading } = useLoading();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [introSeen, setIntroSeen] = useState<boolean>(false);

  const { signInUser, signInWithGoogle, signUpNewUser } = UserAuth();

  const router = useIonRouter();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    showLoading();
    try {
      const response = await signInUser({ email, password });
      if (!response.success) {
        setError(response.error);
        return;
      }
      return response.data;
    } catch (error: any) {
      setError(error);
    } finally {
      hideLoading();
    }
  };

  return (
    <IonContent>
      <form onSubmit={handleSignIn}>
        <IonList>
          <IonItem>
            <IonInput
              label="Email"
              type="email"
              labelPlacement="stacked"
              value={email}
              onIonInput={(event: Event) =>
                setEmail((event.target as HTMLInputElement).value)
              }
            />
          </IonItem>

          <IonItem>
            <IonInput
              label="Password"
              type="password"
              labelPlacement="stacked"
              value={password}
              onIonInput={(event: Event) =>
                setPassword((event.target as HTMLInputElement).value)
              }
            >
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>
          </IonItem>
        </IonList>

        {error && (
          <IonText color="danger" className="ion-padding">
            {error}
          </IonText>
        )}

        <p>
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

        <IonButton className="ion-margin-top" expand="block" type="submit">
          Log in
        </IonButton>

        <IonButton expand="block" onClick={signInWithGoogle}>
          <IonIcon slot="start" />
          Log in with Google
        </IonButton>

        <p>
          Don't have an account?{" "}
          <IonText
            onClick={() =>
              nav.push(() => (
                <Register
                  nav={nav}
                  showLoading={showLoading}
                  hideLoading={hideLoading}
                  signUpNewUser={signUpNewUser}
                />
              ))
            }
          >
            Register here
          </IonText>
        </p>
      </form>
    </IonContent>
  );
};

export default Login;
