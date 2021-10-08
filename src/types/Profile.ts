import { Character } from "./Character";

export type CharacterInfo = Pick<Character, "name" | "status" | "species" | "type" | "gender">;

export type Profile = Pick<Character, "id" | "image"> & {
    characterInformations: CharacterInfo;
};
