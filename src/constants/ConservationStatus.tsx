import { AlertTriangle, Flame, AlertOctagon, OctagonX, EyeOff, Skull } from "lucide-react";
import { JSX } from "react";

export type ConservationStatusType = 
  | "Least concern" 
  | "Near threatened" 
  | "Vulnerable" 
  | "Endangered" 
  | "Critically endangered" 
  | "Extinct in the wild" 
  | "Extinct";

export const conservationStatusMap: Record<ConservationStatusType, JSX.Element> = {
  "Least concern": <img src="/least-concern.svg" alt="Least concern" width={24} height={24} />,
  "Near threatened": <AlertTriangle />,
  "Vulnerable": <Flame />,
  "Endangered": <AlertOctagon />,
  "Critically endangered": <OctagonX />,
  "Extinct in the wild": <EyeOff />,
  "Extinct": <Skull />,
};