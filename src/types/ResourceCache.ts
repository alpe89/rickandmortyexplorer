import { Character, Resource, Episode, Location } from ".";

export type CharacterCache = Record<number, Character>;
export type LocationCache = Record<number, Location>;
export type EpisodeCache = Record<number, Episode>;

export type ResourceCache = Record<Resource, CharacterCache | EpisodeCache | LocationCache | undefined>;
