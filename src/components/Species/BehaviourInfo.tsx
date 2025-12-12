import styles from "./styles/BehaviourInfo.module.css";
import { Specie } from "../../types/species";

export interface Props {
  specie: Specie;
}

const BehaviourInfo = ({ specie }: Props) => {
  console.log(specie);

  return (
    <div>
      {Object.entries(specie.behaviour ?? {}).map(([name, entry]) => (
        <div key={name} className={styles.leadBox}>
          <h3>{name}</h3>
          <p>{entry.description}</p>
          <hr className={styles.line} />
        </div>
      ))}
    </div>
  );
};

export default BehaviourInfo;
