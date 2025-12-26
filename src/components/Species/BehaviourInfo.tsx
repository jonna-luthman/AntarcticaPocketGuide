import styles from "./styles/SpeciesTabs.module.css"
import { SpecieDetail } from "../../types/species";

interface BehaviourInfoProps {
  specie: SpecieDetail;
}

const BehaviourInfo = ({ specie }: BehaviourInfoProps) => {
  return (
    <div>
      <div className={`${styles.leadBox} ${styles.fontBold}`}>
        <p>"{specie.lead_text}"</p>
      </div>
      {Object.entries(specie.behaviour ?? {}).map(([name, entry]) => (
        <div key={name}>
          <h3>{name}</h3>
          <p>{entry.description}</p>
          <hr className={styles.line} />
        </div>
      ))}
    </div>
  );
};

export default BehaviourInfo;
