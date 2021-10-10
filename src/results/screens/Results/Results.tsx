/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from "react";
import { Text, Flex, Grid } from "@chakra-ui/react";
import { ProfileCard } from "../../components";
import { Spinner, Pagination } from "../../../components";
import { useCharacters, useLocations, useEpisodes } from "../../../hooks";
import { Profile } from "../../../types";

export const Results = () => {
    const {
        characters,
        fetchCharacters,
        getCharacterProfileData,
        locationsToFetch,
        episodesToFetch,
        isFetchingCharacters,
        info,
    } = useCharacters();
    const { locations, fetchLocations, createLocationInfo, isFetchingLocations } = useLocations();
    const { episodes, fetchEpisodes, createEpisodeInfo, isFetchingEpisodes } = useEpisodes();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [page, setPage] = useState<number>(1);

    const isFetchingResources = useMemo(
        () => isFetchingCharacters || isFetchingEpisodes || isFetchingLocations,
        [isFetchingCharacters, isFetchingEpisodes, isFetchingLocations]
    );

    useEffect(() => {
        fetchCharacters(page);
    }, [fetchCharacters, page]);

    useEffect(() => {
        fetchLocations(locationsToFetch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchLocations, JSON.stringify(locationsToFetch)]);

    useEffect(() => {
        fetchEpisodes(episodesToFetch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchEpisodes, JSON.stringify(episodesToFetch)]);

    const createProfiles = useCallback(() => {
        if (!isFetchingResources && Object.keys(episodes).length > 0 && Object.keys(locations).length > 0) {
            return Object.keys(characters).map(characterKey => {
                const characterData = getCharacterProfileData(characters[characterKey]);

                return {
                    id: characterData.id,
                    image: characterData.image,
                    characterInfo: (({ id, image, ...rest }) => rest)(characterData),
                    originInfo: createLocationInfo(locations[characterData.origin.name]),
                    locationInfo: createLocationInfo(locations[characterData.location.name]),
                    episodeInfo: createEpisodeInfo(characterData.episode),
                };
            });
        }
    }, [
        characters,
        createEpisodeInfo,
        createLocationInfo,
        episodes,
        getCharacterProfileData,
        isFetchingResources,
        locations,
    ]);

    useEffect(() => {
        const profiles = createProfiles();
        if (profiles) {
            setProfiles(profiles);
        }
    }, [JSON.stringify(characters), JSON.stringify(episodes), JSON.stringify(locations)]);

    if (isFetchingResources) {
        return (
            <Flex justifyContent="center" alignItems="center" p="12">
                <Spinner width="30%" height="30%" />
            </Flex>
        );
    }

    return (
        <>
            <Pagination paginationInfo={info} page={page} onPageChange={setPage} />
            <Grid
                as="section"
                templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
                gap="8"
                py="6"
                px="8"
            >
                {profiles.length > 0 ? (
                    profiles.map(profile => <ProfileCard key={profile.id} profile={profile} />)
                ) : (
                    <Text>No profiles were found.</Text>
                )}
            </Grid>
            <Pagination paginationInfo={info} page={page} onPageChange={setPage} pt="none" pb="4" />
        </>
    );
};
