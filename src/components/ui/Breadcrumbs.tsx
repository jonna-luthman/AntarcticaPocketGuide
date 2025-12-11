import React from "react";
import { IonBreadcrumb, IonBreadcrumbs } from "@ionic/react";

interface BreadcrumbsProps {
  param1: string | undefined;
  param2?: string | undefined;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  param1,
  param2,
}) => {
  return (
    <IonBreadcrumbs>
      <IonBreadcrumb href={`/`}>Home</IonBreadcrumb>
      {param1 && <IonBreadcrumb href={`/${param1}`}>{param1}</IonBreadcrumb>}
      {param2 && (
        <IonBreadcrumb href={`/${param1}/${param2}`}>{param2}</IonBreadcrumb>
      )}
    </IonBreadcrumbs>
  );
};

export default Breadcrumbs;
