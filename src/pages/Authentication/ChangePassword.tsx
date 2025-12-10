import React, { FormEvent, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonInput,
  IonInputPasswordToggle,
  IonText,
  IonButton,
  IonNav,
} from "@ionic/react";
import { checkPasswordsMatch } from "../../utils/checkPasswordsMatch";
import useUsers from "../../hooks/useUser";
import { AuthResult } from "../../types/auth";
import { useLoading } from "../../context/LoadingContext";
import Login from "./Login";
import { Link } from "react-router-dom";

const ChangePassword: React.FC = () => {
  const { showLoading, hideLoading } = useLoading();
  const { updateUser } = useUsers();

  const [form, setForm] = useState({
    email: "",
    newPassword: "",
  });
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const [errors, setErrors] = useState({
    password: "",
    api: "",
  });

  const [showForm, setShowForm] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>("");

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();

    const validPassword = checkPasswordsMatch(form.newPassword, repeatPassword);

    if (!validPassword) {
      setErrors((prev) => ({ ...prev, api: "Passwords do not match" }));
      return;
    }
    showLoading();

    const result: AuthResult = await updateUser({
      email: form.email,
      password: form.newPassword,
    });

    if (!result.success) {
      setErrors((prev) => ({ ...prev, api: result.error }));
      hideLoading();
      return;
    }

    hideLoading();
    setShowForm(false);
    setSuccess("Password was successfully updated!");
  };

  return (
    <IonContent fullscreen scrollY={false}>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Change password</IonTitle>
        </IonToolbar>
      </IonHeader>
      {showForm && (
        <form onSubmit={handleReset}>
          <IonList>
            <IonItem>
              <IonInput
                label="Email"
                type="email"
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
                labelPlacement="stacked"
                value={form.newPassword}
                onIonInput={(event: CustomEvent) =>
                  setForm((prev) => ({
                    ...prev,
                    newPassword: event.detail.value,
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
                className={errors.password ? "ion-invalid" : "ion-valid"}
                onIonInput={(event: Event) =>
                  setRepeatPassword((event.target as HTMLInputElement).value)
                }
              />
            </IonItem>
          </IonList>

          {errors.password && (
            <IonText color="danger" className="ion-padding">
              {errors.password}
            </IonText>
          )}

          {errors.api && (
            <IonText color="danger" className="ion-padding">
              {errors.api}
            </IonText>
          )}

          <IonButton className="ion-margin-top" expand="block" type="submit">
            Reset password
          </IonButton>
          <IonButton
            className="ion-margin-top"
            expand="block"
            routerLink="/home"
          >
            Go back
          </IonButton>
        </form>
      )}

      {success && (
        <IonContent>
          <IonText color="success" className="ion-padding">
            {success}
          </IonText>
          <Link to="/login">Go back to login</Link>
        </IonContent>
      )}
    </IonContent>
  );
};

export default ChangePassword;
