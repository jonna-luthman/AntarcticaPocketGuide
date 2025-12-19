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

import styles from "../components/styles/Auth.module.css";

interface LoginModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, setIsOpen }) => {
  const navRef = useRef<HTMLIonNavElement>(null);
  const router = useIonRouter()

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [introSeen, setIntroSeen] = useState<boolean>(false);

  const { signInUser, signInWithGoogle, session } = UserAuth();

  const handleDismiss = () => {
    setIsOpen(false);

    if (!session) {
      router.push("/", "none");
    }
  };

  useEffect(() => {
    if (session) {
      setIsOpen(false);
    }
  }, [session, setIsOpen]);

  return (
    <>
      <IonModal
        className="custom-modal"
        isOpen={isOpen}
        onDidDismiss={handleDismiss}
        initialBreakpoint={1}
        breakpoints={[0, 1]}
      >
        <IonNav
          ref={navRef}
          root={() => <Login nav={navRef.current} setIsOpen={setIsOpen}/>}
        />
      </IonModal>
    </>
  );
};

export default LoginModal;
