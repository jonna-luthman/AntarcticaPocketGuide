import React, { createContext, useContext, useState } from "react";
import { IonContent, IonLoading } from "@ionic/react";

interface LoadingContextType {
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const showLoading = () => {
    setIsOpen(true);
  };

  const hideLoading = () => setIsOpen(false);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      <IonContent>
        <div>
          <IonLoading
            isOpen={isOpen}
            spinner="bubbles"
            backdropDismiss={false}
            animated={true}
            duration={0}
          />
        </div>
      </IonContent>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used inside LoadingProvider");
  }
  return context;
};
