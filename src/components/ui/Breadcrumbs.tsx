import React from "react";
import { IonBreadcrumb, IonBreadcrumbs } from "@ionic/react";
import { useTranslation } from "react-i18next";

interface BreadcrumbsProps {
  param1: string | undefined;
  param2?: string | undefined;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  param1,
  param2,
}) => {
  const {t} = useTranslation()
  return (
    <IonBreadcrumbs>
      <IonBreadcrumb href={`/`}>{t('menu.page.home')}</IonBreadcrumb>
      {param1 && <IonBreadcrumb href={`/${param1}`}>{param1}</IonBreadcrumb>}
      {param2 && (
        <IonBreadcrumb href={`/${param1}/${param2}`}>{param2}</IonBreadcrumb>
      )}
    </IonBreadcrumbs>
  );
};

export default Breadcrumbs;
