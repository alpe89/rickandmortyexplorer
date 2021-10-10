import { Updater } from "use-immer";
import { CharacterMap, Resource, EpisodeMap, LocationMap } from ".";

export type DataSource = {
    [K in Resource]: K extends Resource.CHARACTERS
        ? CharacterMap
        : K extends Resource.EPISODES
        ? EpisodeMap
        : LocationMap;
} & {
    setCharacters: Updater<CharacterMap>;
    setLocations: Updater<LocationMap>;
    setEpisodes: Updater<EpisodeMap>;
};
