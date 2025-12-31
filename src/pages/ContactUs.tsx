import {
  IonPage,
  IonContent,
  IonTitle,
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
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { useLoading } from "../context/LoadingContext";
import { checkmarkCircleOutline } from "ionicons/icons";

const validateForm = (data: any) => {
  const newErrors = { name: "", email: "", subject: "", message: "" };

  if (!data.name.trim()) newErrors.name = "Name is required";
  else if (data.name.trim().length < 2)
    newErrors.name = "Name must be at least 2 chars";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) newErrors.email = "Email is required";
  else if (!emailRegex.test(data.email))
    newErrors.email = "Invalid email address";

  if (!data.subject.trim()) newErrors.subject = "Subject is required";
  if (!data.message.trim()) newErrors.message = "Message is required";

  return newErrors;
};

const ContactUs: React.FC = () => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
  }, [formData]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (data: typeof formData) => {
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

    if (!formData.subject.trim()) {
      newErrors.subject = t("pages.contactUs.errorMessages.subjectEmpty");
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = t("pages.contactUs.errorMessages.subjectError");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalErrors = validateForm(formData);
    const isFormValid = Object.values(finalErrors).every((x) => x === "");

    if (isFormValid) {
      setIsSubmitted(true);
    } else {
      setTouched({
        name: true,
        email: true,
        subject: true,
        message: true,
      });
    }
  };

  return (
    <IonPage>
      <Header showMenu={true} />
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
            <IonButton fill="solid" onClick={() => setIsSubmitted(false)}>
              {t("pages.contactUs.success.back")}
            </IonButton>
          </div>
        </IonContent>
      ) : (
        <>
          <IonContent fullscreen>
            <div className="ion-padding">
              <IonText>
                <h2>{t("pages.contactUs.title")}</h2>
              </IonText>
              <IonText>
                <p>{t("pages.contactUs.description")}</p>
              </IonText>
            </div>
            <IonGrid>
              <form onSubmit={handleSubmit}>
                <IonList lines="full">
                  <IonItem>
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
                      required
                    />
                  </IonItem>

                  <IonItem>
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

                  <IonItem>
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
                      required
                    />
                  </IonItem>

                  <IonItem>
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
                      } ${touched.message && "ion-touched"}`}
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
