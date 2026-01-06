import { RefObject } from "react";
import { useIonViewDidEnter } from "@ionic/react";

export const useAutoFocus = (ref: RefObject<any>) => {
  useIonViewDidEnter(() => {
    console.log("Nu loggar jag äntligen!");
    setTimeout(() => {
      if (ref.current?.setFocus) {
        ref.current.setFocus();
      } else {
        ref.current.focus();
      }
    }, 150);
  });
};
