import { createContext, FC, ReactNode, useContext, useMemo } from "react";
import { useImmer } from "use-immer";
import { CharacterMap, DataSource, EpisodeMap, LocationMap, Resource } from "../types";

const DataContext = createContext<DataSource>({} as DataSource);

type Props = { children: ReactNode };

const DataSourceProvider: FC<Props> = ({ children }) => {
    const [characters, setCharacters] = useImmer<CharacterMap>({});
    const [locations, setLocations] = useImmer<LocationMap>({});
    const [episodes, setEpisodes] = useImmer<EpisodeMap>({});

    const contextValue = useMemo(() => {
        return {
            [Resource.CHARACTERS]: { ...characters },
            [Resource.LOCATIONS]: { ...locations },
            [Resource.EPISODES]: { ...episodes },
            setCharacters,
            setLocations,
            setEpisodes,
        };
    }, [characters, episodes, locations, setCharacters, setEpisodes, setLocations]);

    return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

const useDataSource = () => {
    const data = useContext(DataContext);

    if (!data) {
        throw new Error("useDataSource must be preceded by a DataSourceProvider. It seems thats not the case...");
    }

    return { ...data };
};

export { DataSourceProvider, useDataSource };
