import React, { FormEvent, useState } from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonLink,
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
    setErrors({ password: "", api: "" });

    const validPassword = checkPasswordsMatch(form.newPassword, repeatPassword);
    if (!validPassword) {
      setErrors((prev) => ({ ...prev, api: "Passwords do not match" }));
      return;
    }

    try {
      showLoading();
      const result = await updateUser({
        email: form.email,
        password: form.newPassword,
      });

      console.log("result", result);

      if (!result.success) {
        setErrors((prev) => ({ ...prev, api: result.error }));
        hideLoading();
        return;
      }
      setShowForm(false);
      setSuccess("Password was successfully updated!");
    } catch (err: any) {
      console.error("Critical error in handleReset:", err);
      setErrors((prev) => ({ ...prev, api: "An unexpected error occurred." }));
    } finally {
      hideLoading();
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false} className="ion-padding">
        <div>
          <IonText className="ion-text-center">
            <h2>Change password</h2>
          </IonText>
        </div>
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
                  label="New password"
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

            <IonButton
              className="ion-margin-top"
              type="submit"
              expand="block"
              color="dark"
            >
              Reset password
            </IonButton>

            <IonButton
              className="ion-margin-top"
              type="submit"
              expand="block"
              fill="transparent"
              color="dark"
              
            >
              Cancel
            </IonButton>
          </form>
        )}

        {success && (
          <div>
            <IonText color="success" className="ion-padding">
              {success}
            </IonText>
            
              <div>
                <IonButton
                  expand="block"
                  fill="transparent"
                  onClick={() => nav.pop()}
                >
                  <IonText>Go back to log in</IonText>
                </IonButton>
              </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword;
