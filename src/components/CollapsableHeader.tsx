import {
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import useSpecies from "../hooks/useSpecies";
import { useRef, useState } from "react";
import { SpecieSummary } from "../types/species";

const CollapsableHeader = () => {
  const { getSpeciesBySearchQuery } = useSpecies();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SpecieSummary[] | null>(null);
  const [message, setMessage] = useState<string>("");

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleInput = async (event: Event) => {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.trim().toLowerCase() ?? "";
    setQuery(query);

    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(async () => {
      const data = await getSpeciesBySearchQuery(query);
      if (data?.length === 0) {
        setMessage("No species found");
      }
      setResults(data);
    }, 300);
  };

  return (
    <>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonSearchbar
            onIonInput={(event) => handleInput(event)}
            debounce={1000}
            placeholder="Search for species..."
          />
        </IonToolbar>
      </IonHeader>

      {query.length > 0 && (
        <IonList inset={true}>
          {results && results.length > 0 ? (
            results.map((result) => (
              <IonItem
                routerLink={`/${result.class_slug}/${result.slug}`}
                key={result.id}
              >
                <IonLabel>{result.name_common}</IonLabel>
              </IonItem>
            ))
          ) : (
            <IonItem>
              <IonLabel>{message}</IonLabel>
            </IonItem>
          )}
        </IonList>
      )}
    </>
  );
};

export default CollapsableHeader;
