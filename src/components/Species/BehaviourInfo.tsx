import styles from "./styles/SpeciesTabs.module.css";
import { SpecieDetail } from "../../types/species";
import useGetLang from "../../hooks/useGetlang";

interface BehaviourInfoProps {
  specie: SpecieDetail;
}

const BehaviourInfo = ({ specie }: BehaviourInfoProps) => {
  const getLang = useGetLang();

  return (
    <div>
      <div className={`${styles.leadBox} ${styles.fontBold}`}>
        <p>"{getLang(specie, "lead_text")}"</p>
      </div>
      {Object.entries(getLang(specie, "behaviour") ?? {}).map(
        ([title, entry]) => (
          <div key={title}>
            <h3>{title}</h3>
            <p>{(entry as { description: string }).description}</p>
            <hr className={styles.line} />
          </div>
        )
      )}
    </div>
  );
};

export default BehaviourInfo;
