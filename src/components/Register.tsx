import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonButton,
  useIonRouter,
  IonText,
} from "@ionic/react";
import React, { FormEvent, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import { checkPasswordsMatch } from "../utils/checkPasswordsMatch";

interface RegisterProps {
  nav: any;
  onLoginSuccess: () => void;
  signUpNewUser: () => void;
}

const Register: React.FC<RegisterProps> = ({ nav, onLoginSuccess, signUpNewUser }) => {
  const router = useIonRouter();

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
    showLoading();

    const validPassword = checkPasswordsMatch(form.password, repeatPassword);

    if (!validPassword) {
      setErrors((prev) => ({
        ...prev,
        repeatPassword: "Passwords do not match",
      }));
      return;
    }

    const result = await signUpNewUser(form);
    hideLoading();

    if (!result.success) {
      setErrors((prev) => ({ ...prev, form: result.error }));
      return;
    }

    router.push("home", "none");
    setErrors({ email: "", repeatPassword: "", form: "" });
  };

  return (
    <IonContent fullscreen>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <form onSubmit={handleSubmit}>
        <IonList>
          <IonItem>
            <IonInput
              name="name"
              label="Name"
              labelPlacement="stacked"
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
              className={errors.email ? "ion-invalid" : "ion-valid"}
              labelPlacement="stacked"
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
              label="Password"
              type="password"
              value={form.password}
              labelPlacement="stacked"
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
              labelPlacement="stacked"
              className={errors.repeatPassword ? "ion-invalid" : "ion-valid"}
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

        <IonButton className="ion-margin-top" expand="block" type="submit">
          Sign up
        </IonButton>

        <IonText
          className="ion-margin-top"
          expand="block"
          onClick={() => nav.pop()}
        >
          Already have an account?
        </IonText>
      </form>
    </IonContent>
  );
};

export default Register;
