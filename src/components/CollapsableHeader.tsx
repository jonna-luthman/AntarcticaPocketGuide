import {
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonList,
  IonItem,
  IonText,
  IonLabel,
  IonRouterLink,
} from "@ionic/react";
import useSpecies from "../hooks/useSpecies";
import { useRef, useState } from "react";
import { SpecieSummary } from "../types/species";

const CollapsableHeader = () => {
  const { getSpeciesBySearchQuery } = useSpecies();
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SpecieSummary[] | []>([]);
  const [message, setMessage] = useState<string>("");
  
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleInput = async (event: Event) => {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.trim().toLowerCase() ?? "";
    setQuery(query);

    if (query.length === 0) {
      setResults([]);
      setMessage("No species found");
      return;
    }

    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(async () => {
      const data = await getSpeciesBySearchQuery(query);
      setResults(data);
    }, 300);
  };

  return (
    <IonHeader collapse="condense">
      <IonToolbar>
        <IonSearchbar
          onIonInput={(event) => handleInput(event)}
          debounce={1000}
        />
      </IonToolbar>
      {query.length > 0 && (
        <IonList inset={true}>
          {results.length > 0 ? (
            results.map((result) => (
              <IonRouterLink
                href={`/${result.class_slug}/${result.slug}`}
                key={result.id}
              >
                <IonItem key={result.id}>
                  <IonLabel>{result.name_common}</IonLabel>
                </IonItem>
              </IonRouterLink>
            ))
          ) : (
            <IonText>{message}</IonText>
          )}
        </IonList>
      )}
    </IonHeader>
  );
};

export default CollapsableHeader;
