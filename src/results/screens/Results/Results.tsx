import { useEffect, useMemo, useState } from "react";
import { Text, Flex, Grid } from "@chakra-ui/react";
import { ProfileCard } from "../../components";
import { Spinner } from "../../../components";
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
    } = useCharacters();
    const { locations, fetchLocations, createLocationInfo, isFetchingLocations } = useLocations();
    const { episodes, fetchEpisodes, createEpisodeInfo, isFetchingEpisodes } = useEpisodes();
    const [profiles, setProfiles] = useState<Profile[]>([]);

    const isFetchingResources = useMemo(
        () => isFetchingCharacters || isFetchingEpisodes || isFetchingLocations,
        [isFetchingCharacters, isFetchingEpisodes, isFetchingLocations]
    );

    useEffect(() => {
        fetchCharacters();
    }, [fetchCharacters]);

    useEffect(() => {
        fetchLocations(locationsToFetch);
    }, [fetchLocations, locationsToFetch]);

    useEffect(() => {
        fetchEpisodes(episodesToFetch);
    }, [fetchEpisodes, episodesToFetch]);

    useEffect(() => {
        if (!isFetchingResources && Object.keys(episodes).length > 0 && Object.keys(locations).length > 0) {
            const profileList = Object.keys(characters).map(characterKey => {
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

            setProfiles(profileList);
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

    if (isFetchingResources) {
        return (
            <Flex justifyContent="center" alignItems="center" maxW="30%" maxH="30%">
                <Spinner />
            </Flex>
        );
    }

    return (
        <Grid
            as="section"
            templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
            gap="8"
        >
            {profiles.length > 0 ? (
                profiles.map(profile => <ProfileCard key={profile.id} profile={profile} />)
            ) : (
                <Text>No profiles were found.</Text>
            )}
        </Grid>
    );
};
