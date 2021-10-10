export const addToMap = (key: string | null, map: Record<string, number>): void => {
    if (key) {
        map[key] = map[key] ? map[key] + 1 : 1;
    }
};
