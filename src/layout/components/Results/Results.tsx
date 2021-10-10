import { useEffect, useMemo, useState } from "react";
import { getCharacters, getLocation, getEpisode } from "rickmortyapi";
import { ProfileCard } from "..";
import { Spinner } from "../../../components";
import { Character, LocationMap, EpisodeMap, Profile, LocationInfo, Location } from "../../../types";

const getIdFromResourceUrl = (url: string): string | null => {
    if (url === "") return null;

    return url.slice(url.lastIndexOf("/") + 1);
};

const addToMap = (key: string | null, map: Record<string, number>) => {
    if (!key) {
        return;
    }

    map[key] = map[key] ? map[key] + 1 : 1;
};

const locationAdapter = (location: Location): LocationInfo => {
    if (!location) return {} as LocationInfo;

    const { name, type, dimension, residents, url } = location;

    return { name, type, dimension, residents: [...residents], url };
};

export const Results = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [locations, setLocations] = useState<LocationMap>({});
    const [episodes, setEpisodes] = useState<EpisodeMap>({});
    const [profiles, setProfiles] = useState<Profile[]>([]);

    const resourcesToGet = useMemo(() => {
        const locationsMap: Record<string, number> = {};
        const episodesMap: Record<string, number> = {};

        characters.forEach(character => {
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

        return {
            locations: Object.keys(locationsMap).map(Number),
            episodes: Object.keys(episodesMap).map(Number),
        };
    }, [characters]);

    const isFetchingResources = useMemo(
        () => resourcesToGet.episodes.length === 0 || resourcesToGet.locations.length === 0,
        [resourcesToGet.episodes.length, resourcesToGet.locations.length]
    );

    useEffect(() => {
        getCharacters().then(response => {
            if (response.data.results) {
                setCharacters(response.data.results);
            }
        });
    }, []);

    useEffect(() => {
        if (resourcesToGet.locations.length > 0) {
            getLocation(resourcesToGet.locations).then(response => {
                if (response.data) {
                    const map: LocationMap = {};
                    response.data.forEach(location => {
                        map[location.name] = location;
                    });
                    setLocations(map);
                }
            });
        }

        if (resourcesToGet.episodes.length > 0) {
            getEpisode(resourcesToGet.episodes).then(response => {
                if (response.data) {
                    const map: EpisodeMap = {};
                    response.data.forEach(episode => {
                        map[episode.id] = episode.name;
                    });
                    setEpisodes(map);
                }
            });
        }
    }, [resourcesToGet]);

    useEffect(() => {
        if (!isFetchingResources && Object.keys(episodes).length > 0 && Object.keys(locations).length > 0) {
            const profileList = characters.map(character => {
                const { id, image, name, status, species, type, gender, url, origin, location, episode } = character;

                return {
                    id,
                    image,
                    characterInfo: { name, status, species, type, gender, url },
                    originInfo: locationAdapter(locations[origin.name]),
                    locationInfo: locationAdapter(locations[location.name]),
                    episodeInfo: episode.map(episodeUrl => {
                        const episodeId = getIdFromResourceUrl(episodeUrl)!;
                        return episodes[episodeId];
                    }),
                };
            });

            setProfiles(profileList);
        }
    }, [characters, episodes, isFetchingResources, locations]);

    if (isFetchingResources) {
        return <Spinner />;
    }

    return (
        <>
            {profiles.length > 0 ? (
                profiles.map(profile => <ProfileCard key={profile.id} profile={profile} />)
            ) : (
                <p>Nessun profilo per ora</p>
            )}
        </>
    );
};
