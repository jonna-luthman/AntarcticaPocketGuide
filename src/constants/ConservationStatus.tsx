import { AlertTriangle, Flame, AlertOctagon, OctagonX, EyeOff, Skull } from "lucide-react";
import { JSX } from "react";
import leastConcernIcon from "../assets/ConservationStatus/least-concern.svg"
import cirticallyEndangeredIcon from "../assets/ConservationStatus/critically-endangered.svg"
import endangeredIcon from "../assets/ConservationStatus/endangered.svg"
import extinctInTheWildIcon from "../assets/ConservationStatus/extinct-in-the-wild.svg"
import extinctIcon from "../assets/ConservationStatus/extinct.svg"
import nearThreatenedIcon from "../assets/ConservationStatus/near-threatened.svg"
import vulnerableIcon from "../assets/ConservationStatus/vulnerable.svg"

export type ConservationStatusType = 
  | "Least concern" 
  | "Near threathened" 
  | "Vulnerable" 
  | "Endangered" 
  | "Critically endangered" 
  | "Extinct in the wild" 
  | "Extinct";

export const conservationStatusMap: Record<ConservationStatusType, JSX.Element> = {
  "Least concern": <img src={leastConcernIcon} alt="IUCN - Least concern label" width={24} height={24} />,
  "Near threathened": <img src={nearThreatenedIcon} alt="IUCN - Near threatened label" width={24} height={24} />,
  "Vulnerable": <img src={vulnerableIcon} alt="IUCN - Vulnerable label" width={24} height={24} />,
  "Endangered": <img src={endangeredIcon} alt="IUCN - Endangered label" width={24} height={24} />,
  "Critically endangered": <img src={cirticallyEndangeredIcon} alt="IUCN - Criitically endangered label" width={24} height={24} />,
  "Extinct in the wild": <img src={extinctInTheWildIcon} alt="IUCN - Extinct in the wild" width={24} height={24} />,
  "Extinct": <img src={extinctIcon} alt="IUCN - Extinct label" width={24} height={24} />
};