import {
  IonPage,
  IonContent,
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonTextarea,
  IonText,
  IonIcon,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { useLoading } from "../context/LoadingContext";
import { checkmarkCircleOutline } from "ionicons/icons";
import { supabase } from "../api/supabaseClient";

interface FormdataType {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();
  const [formData, setFormData] = useState<FormdataType>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormdataType>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const validationErrors = validateForm();
    setErrors(validationErrors);
  }, [formData]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = t("pages.contactUs.errorMessages.nameEmpty");
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t("pages.contactUs.errorMessages.nameError");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("pages.contactUs.errorMessages.emailEmpty");
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t("pages.contactUs.errorMessages.emailError");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("pages.contactUs.errorMessages.messageEmpty");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("pages.contactUs.errorMessages.messageError");
    }

    return newErrors;
  };

  const handleBlur = (name: string) => {
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalErrors = validateForm();
    const isFormValid = Object.values(finalErrors).every((x) => x === "");

    if (!isFormValid) {
      setTouched({
        name: true,
        email: true,
        subject: true,
        message: true,
      });
      return;
    }

    showLoading();
    try {
      const { error } = await supabase.functions.invoke("resend", {
        body: formData,
      });

      if (error) throw error;

      setIsSubmitted(true);
    } catch (err) {
      console.error("Error sending email:", err);
      return { success: false, error: err };
    } finally {
      hideLoading();
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <IonPage>
      <Header showBackButton={true}/>
      {isSubmitted ? (
        <IonContent fullscreen>
          <div className="ion-text-center ion-margin-top ion-padding">
            <IonIcon
              icon={checkmarkCircleOutline}
              color="success"
              style={{ fontSize: "96px" }}
            />
            <h2>{t("pages.contactUs.success.title")}</h2>
            <p>{t("pages.contactUs.success.message")}</p>
          </div>
        </IonContent>
      ) : (
        <>
          <IonContent fullscreen>
            <div className="ion-margin ion-padding-horizontal">
              <IonText>
                <h2>{t("pages.contactUs.title")}</h2>
                <p>{t("pages.contactUs.description")}</p>
              </IonText>
            </div>
            <hr />
            <IonGrid className="ion-margin">
              <form onSubmit={handleSubmit}>
                <IonList>
                  <IonItem lines="none">
                    <IonLabel position="stacked">
                      {t("pages.contactUs.form.name") || "Name"}*
                    </IonLabel>
                    <IonInput
                      placeholder={t("pages.contactUs.form.name")}
                      value={formData.name}
                      onIonInput={(e) =>
                        setFormData({ ...formData, name: e.detail.value! })
                      }
                      onIonBlur={() => handleBlur("name")}
                      errorText={errors.name}
                      className={`${
                        errors.name && touched.name
                          ? "ion-invalid"
                          : "ion-valid"
                      } ${touched.name && "ion-touched"}`}
                    />
                  </IonItem>

                  <IonItem lines="none"> 
                    <IonLabel position="stacked">
                      {t("pages.contactUs.form.email") || "Email"}*
                    </IonLabel>
                    <IonInput
                      type="email"
                      placeholder={t("pages.contactUs.form.emailPlaceholder")}
                      value={formData.email}
                      onIonInput={(e) =>
                        setFormData({ ...formData, email: e.detail.value! })
                      }
                      onIonBlur={() => handleBlur("email")}
                      errorText={errors.email}
                      className={`${
                        errors.email && touched.email
                          ? "ion-invalid"
                          : "ion-valid"
                      } ${touched.email && "ion-touched"}`}
                      required
                    />
                  </IonItem>

                  <IonItem >
                    <IonLabel position="stacked">
                      {t("pages.contactUs.form.subject") || "Subject"}*
                    </IonLabel>
                    <IonInput
                      placeholder={t("pages.contactUs.form.subjectPlaceholder")}
                      value={formData.subject}
                      onIonInput={(e) =>
                        setFormData({ ...formData, subject: e.detail.value! })
                      }
                      onIonBlur={() => handleBlur("subject")}
                      errorText={errors.subject}
                      className={`${
                        errors.subject && touched.subject
                          ? "ion-invalid"
                          : "ion-valid"
                      } ${touched.subject && "ion-touched"}`}
                    />
                  </IonItem>

                  <IonItem lines="none">
                    <IonLabel position="stacked">
                      {t("pages.contactUs.form.message") || "Message"}*
                    </IonLabel>
                    <IonTextarea
                      placeholder={t("pages.contactUs.form.messagePlaceholder")}
                      rows={6}
                      value={formData.message}
                      onIonInput={(e) =>
                        setFormData({ ...formData, message: e.detail.value! })
                      }
                      onIonBlur={() => handleBlur("message")}
                      errorText={errors.message}
                      className={`${
                        errors.message && touched.message
                          ? "ion-invalid"
                          : "ion-valid"
                      } ${touched.message && "ion-touched"} ion-no-border`}
                      required
                    />
                  </IonItem>
                </IonList>

                <IonRow className="ion-margin-top">
                  <IonCol>
                    <IonButton
                      type="submit"
                      expand="block"
                      shape="round"
                      color="tertiary"
                      className="custom-submit-button"
                    >
                      {t("pages.contactUs.form.send") || "Send"}
                    </IonButton>
                  </IonCol>
                </IonRow>
              </form>
            </IonGrid>
          </IonContent>
        </>
      )}
    </IonPage>
  );
};

export default ContactUs;
