import { useCallback, useEffect, useState } from "react";
import { getCharacters } from "rickmortyapi";
import { useDataSource } from "../data";
import { addToMap, getIdFromResourceUrl } from "../helpers";
import { Character, CharacterMap, Info } from "../types";

export const useCharacters = () => {
    const { characters, setCharacters } = useDataSource();
    const [info, setInfo] = useState<Info>();
    const [isFetchingCharacters, setIsFetchingCharacters] = useState<boolean>(false);
    const [locationsToFetch, setLocationsToFetch] = useState<number[]>([]);
    const [episodesToFetch, setEpisodesToFetch] = useState<number[]>([]);

    const fetchCharacters = useCallback(
        async (page = 1) => {
            setIsFetchingCharacters(true);
            try {
                const response = await getCharacters({ page });

                if (response.data.info) {
                    setInfo(response.data.info);
                }

                if (response.data.results) {
                    const charactersMap: CharacterMap = {};

                    response.data.results.forEach(character => {
                        charactersMap[character.id] = character;
                    });

                    setCharacters(charactersMap);
                }
                setIsFetchingCharacters(false);
            } catch (e: any) {
                setIsFetchingCharacters(false);
                throw new Error(e.message);
            }
        },
        [setCharacters]
    );

    const getCharacterProfileData = useCallback(
        (character: Character) => (({ created, ...rest }) => rest)(character),
        []
    );

    const setResourcesToFetch = useCallback(() => {
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

    useEffect(() => {
        setResourcesToFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(characters)]);

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
