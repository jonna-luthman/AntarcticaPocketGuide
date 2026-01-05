import { IonModal, IonNav } from "@ionic/react";
import React, { useEffect, useRef } from "react";
import { UserAuth } from "../../context/AuthContext";
import Login from "../../components/auth/Login";

interface LoginModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, setIsOpen }) => {
  const navRef = useRef<HTMLIonNavElement>(null);
  const { session } = UserAuth();

  const handleDismiss = () => {
    setIsOpen(false);
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
          root={() => <Login nav={navRef.current!} setIsOpen={setIsOpen} />}
        />
      </IonModal>
    </>
  );
};

export default LoginModal;
