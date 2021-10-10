import { useCallback, useEffect, useState } from "react";
import { getCharacters } from "rickmortyapi";
import { useDataSource } from "../data";
import { addToMap, getIdFromResourceUrl } from "../helpers";
import { Character, Info } from "../types";

export const useCharacters = () => {
    const { characters, setCharacters } = useDataSource();
    const [info, setInfo] = useState<Info>();
    const [isFetchingCharacters, setIsFetchingCharacters] = useState<boolean>(false);
    const [locationsToFetch, setLocationsToFetch] = useState<number[]>([]);
    const [episodesToFetch, setEpisodesToFetch] = useState<number[]>([]);

    const fetchCharacters = useCallback(async () => {
        setIsFetchingCharacters(true);

        getCharacters()
            .then(response => {
                if (response.data.info) {
                    setInfo(response.data.info);
                }

                if (response.data.results) {
                    setCharacters(draft => {
                        response.data.results!.forEach(character => {
                            draft[character.id] = character;
                        });
                    });
                }
            })
            .finally(() => {
                setIsFetchingCharacters(false);
            });
    }, [setCharacters]);

    const getCharacterProfileData = useCallback(
        (character: Character) => (({ created, ...rest }) => rest)(character),
        []
    );

    useEffect(() => {
        const locationsMap: Record<string, number> = {};
        const episodesMap: Record<string, number> = {};

        Object.keys(characters).forEach(characterKey => {
            const character = characters[characterKey];

            const originId = getIdFromResourceUrl(character.origin.url);
            if (originId) {
                addToMap(originId, locationsMap);
            }

            const locationId = getIdFromResourceUrl(character.location.url);
            if (locationId) {
                addToMap(locationId, locationsMap);
            }

            character.episode.forEach(episodeUrl => {
                const episodeId = getIdFromResourceUrl(episodeUrl);
                addToMap(episodeId, episodesMap);
            });
        });

        setLocationsToFetch(Object.keys(locationsMap).map(Number));
        setEpisodesToFetch(Object.keys(episodesMap).map(Number));
    }, [characters]);

    return {
        characters,
        info,
        fetchCharacters,
        getCharacterProfileData,
        isFetchingCharacters,
        locationsToFetch,
        episodesToFetch,
    };
};
