import {
  IonPage,
  IonContent,
  IonText,
  IonButton,
} from "@ionic/react";
import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import AntarcticaImg from "../assets/Images/SR306880.webp";

import styles from "./styles/AboutUs.module.css";

const AboutUs: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <Header showMenu={true} />

      <IonContent>
        <div className={styles.container}>
          <section className={styles.heroSection}>
            <h1 className={styles.title}>{t('pages.aboutUs.titles.about')}</h1>
            <img
              src={AntarcticaImg}
              alt="Antarctica"
              className={styles.heroImage}
            />
          </section>

          <hr className={styles.linebreaker} />

          <section className={styles.contentSection}>
            <h2>{t('pages.aboutUs.titles.section_1')}</h2>
            <p>
              {t('pages.aboutUs.text.section_1')}
            </p>
          </section>

          <hr className={styles.linebreaker} />

          <section className={styles.contentSection}>
            <h2 className={styles.subtitle}>{t('pages.aboutUs.titles.section_2')}</h2>
            <p>
              {t('pages.aboutUs.text.section_2')}
            </p>
          </section>

          <hr className={styles.linebreaker} />

          <section className={styles.contentSection}>
            <h2 className={styles.subtitle}>{t('pages.aboutUs.titles.section_3')}</h2>
            <p>
              {t('pages.aboutUs.text.section_3')}
            </p>

            <IonButton
              color="medium"
              shape="round"
              className="ion-margin-top"
              routerLink={`/contact-us`}
            >
              <IonText color="light">{t("buttons.contactUs")}</IonText>
            </IonButton>
          </section>

          <hr className={styles.linebreaker} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AboutUs;
