import { Character, Episode, Info, Location } from ".";

export type ApiResponse<T extends Character | Episode | Location> = { info: Info; results: T[] };
