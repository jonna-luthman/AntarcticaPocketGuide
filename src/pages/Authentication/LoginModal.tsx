import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonIcon,
  IonInputPasswordToggle,
  IonItem,
  IonList,
  useIonRouter,
  IonText,
  IonButtons,
  IonNav,
} from "@ionic/react";
import React, { FormEvent, useState, useEffect, useRef } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useLoading } from "../../context/LoadingContext";
import Login from "../../components/Login";

interface LoginModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, setIsOpen }) => {
  const navRef = useRef<HTMLIonNavElement>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [introSeen, setIntroSeen] = useState<boolean>(false);

  const { signInUser, signInWithGoogle, session } = UserAuth();

  useEffect(() => {
    if (session) {
      setIsOpen(false);
    }
  }, [session, setIsOpen]);

  return (
    <>
      <IonModal
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        initialBreakpoint={1}
        breakpoints={[0, 1]}
      >
        <IonNav 
        ref={navRef} 
        // Vi skickar in navRef.current så att Login-komponenten kan styra navigeringen
        root={() => <Login nav={navRef.current} />} 
      />
      </IonModal>
    </>
  );
};

export default LoginModal;
