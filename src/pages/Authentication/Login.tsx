import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonList,
  useIonRouter,
  IonText,
} from "@ionic/react";
import React, { FormEvent, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useLoading } from "../../context/LoadingContext";
import Intro01 from "../../components/intro/Intro01"

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [introSeen, setIntroSeen] = useState<boolean>(false);

  const { showLoading, hideLoading } = useLoading();

  const { signInUser } = UserAuth();
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
      router.push("/", "none");
      return response.data;
    } catch (error: any) {
      setError(error);
    } finally {
      hideLoading();
    }
  };

  const finishIntro = async () => {
    console.log("intro finish")
  }

  return (
    <>
      {!introSeen ? (
        <Intro01 onFinish={finishIntro}/>
      ) : (
        <IonPage>
          <IonContent fullscreen scrollY={false}>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Log in</IonTitle>
              </IonToolbar>
            </IonHeader>
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

              <IonButton
                className="ion-margin-top"
                expand="block"
                type="submit"
              >
                Log in
              </IonButton>
              <IonButton
                className="ion-margin-top"
                expand="block"
                routerLink="/reset-password"
              >
                Forgot your password?
              </IonButton>
              <IonButton
                color={"dark"}
                className="ion-margin-top"
                expand="block"
                routerLink="/register"
              >
                Register
              </IonButton>
            </form>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Login;
