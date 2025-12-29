import React, { FormEvent, useState } from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonInput,
  IonText,
  IonButton,
} from "@ionic/react";
import { checkPasswordsMatch } from "../../utils/checkPasswordsMatch";
import useUsers from "../../hooks/useUser";
import { useLoading } from "../../context/LoadingContext";
import useGetLang from "../../hooks/useGetLang";
import { useTranslation } from "react-i18next";

interface ChangePasswordProps {
  nav: HTMLIonNavElement;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ nav }) => {
  const { showLoading, hideLoading } = useLoading();
  const { updateUser } = useUsers();
  const getLang = useGetLang();
  const { t } = useTranslation();

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

      if (!result.success) {
        setErrors((prev) => ({ ...prev, api: result.error.message }));
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
            <h2>{t("auth.phrases.changePassword")}</h2>
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
                  label={t("auth.form.newPassword")}
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
                  label={t("auth.form.repeatPassword")}
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
              {t("auth.phrases.resetPassword")}
            </IonButton>

            <IonButton
              className="ion-margin-top"
              type="submit"
              expand="block"
              fill="clear"
              color="dark"
            >
              {t("buttons.cancel")}
            </IonButton>
          </form>
        )}

        {success && (
          <div>
            <IonText color="success" className="ion-padding">
              {success}
            </IonText>

            <div>
              <IonButton expand="block" fill="clear" onClick={() => nav.pop()}>
                <IonText>{t("auth.buttons.goBackToLogin")}</IonText>
              </IonButton>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword;
