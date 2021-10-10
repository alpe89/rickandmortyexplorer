import { Character, Episode, Location } from ".";

export type CharacterInfo = Omit<Character, "id" | "origin" | "location" | "created" | "image" | "episode">;
export type LocationInfo = Omit<Location, "id" | "created">;
export type EpisodeInfo = Pick<Episode, "name" | "episode">;

export type Profile = Pick<Character, "id" | "image"> & {
    characterInfo: CharacterInfo;
    originInfo: LocationInfo;
    locationInfo: LocationInfo;
    episodeInfo: EpisodeInfo[];
};
