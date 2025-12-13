import styles from "./styles/SpeciesTabs.module.css"
import { Specie } from "../../types/species";

interface Props {
  specie: Specie;
}

const BehaviourInfo = ({ specie }: Props) => {
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
