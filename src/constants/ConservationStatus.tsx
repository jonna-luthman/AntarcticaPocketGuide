export const ConservationStatus: Record<ConservationStatus, JSX.Element> = {
  "Least concern": <img href="/least-concern.svg"/>,
  "Near threathended": <AlertTriangle />,
  "Vulnerable": <Flame />,
  "Endangered": <AlertOctagon />,
  "Critically endangered": <OctagonX />,
  "Extinct in the wild": <EyeOff />,
  "Extinct": <Skull />,
};
