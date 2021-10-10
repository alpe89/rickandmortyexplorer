import { Character } from ".";

export type Location = {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: Character[];
    url: string;
    created: string;
};

export type LocationMap = Record<string, Location>;
