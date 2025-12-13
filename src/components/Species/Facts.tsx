import styles from "./styles/SpeciesTabs.module.css";
import { Specie } from "../../types/species";

interface Props {
  specie: Specie;
}

const Facts = ({ specie }: Props) => {
  const factsList = specie?.facts?.description;
  return (
    <ul className={styles.list}>
      {factsList?.map((value, key) => (
        <li key={key} className={styles.listItem}>
          {value}
        </li>
      ))}
    </ul>
  );
};

export default Facts;
