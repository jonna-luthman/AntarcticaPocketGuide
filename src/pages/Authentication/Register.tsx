import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonInputPasswordToggle,
  IonButton,
  useIonRouter,
  IonText,
} from "@ionic/react";
import React, { FormEvent, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import useUsers from "../../hooks/useUser";
import { useForm } from "../../hooks/useForm";
import { CreateUser } from "../../types/user";

const Register: React.FC = () => {
  const { createNewUser } = useUsers();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    repeatPassword: "",
    form: "",
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: ""
  });
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const { session, signUpNewUser } = UserAuth();
  const router = useIonRouter();

  // const validateEmail = (email: string) => {
  //   return email.match(
  //     /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  //   );
  // };

  const checkPasswordsMatch = (password: string, repeatPassword: string) => {
    return password === repeatPassword;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true);

    const validPassword = checkPasswordsMatch(form.password, form.repeatPassword)

    if (!validPassword) {
      setErrors((prev) => ({
        ...prev,
        repeatPassword: "Passwords do not match",
      }));
      return;
    }

    const result = await signUpNewUser({email: form.email, password: form.password});

    setLoading(false);

    if (!result.success) {
      setErrors((prev) => ({ ...prev, form: result.error }));
      return;
    }

    router.push("home", "none");
    setErrors({ email: "", repeatPassword: "", form: "" });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonInput
                name="firstName"
                label="Name"
                labelPlacement="stacked"
                value={form.firstName}
                onIonInput={(event: CustomEvent) =>
                  setForm((prev) => ({
                    ...prev,
                    firstName: event.detail.value,
                  }))
                }
              />
            </IonItem>
            <IonItem>
              <IonInput
                name="lastName"
                label="Surname"
                labelPlacement="stacked"
                value={form.lastName}
                onIonInput={(event: CustomEvent) =>
                  setForm((prev) => ({
                    ...prev,
                    lastName: event.detail.value,
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
              ></IonInput>
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
              >
              </IonInput>
            </IonItem>

            <IonItem>
              <IonInput
                label="Repeat password"
                type="password"
                value={form.repeatPassword}
                labelPlacement="stacked"
                className={errors.repeatPassword ? "ion-invalid" : "ion-valid"}
                onIonInput={(event: CustomEvent) =>
                  setForm((prev) => ({
                    ...prev,
                    repeatPassword: event.detail.value,
                  }))}
              >
              </IonInput>
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
          <IonButton
            className="ion-margin-top"
            expand="block"
            routerLink="/login"
          >
            Already have an account?
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Register;
