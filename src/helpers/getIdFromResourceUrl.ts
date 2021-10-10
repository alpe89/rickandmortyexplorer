export const getIdFromResourceUrl = (url: string): string | null =>
    url && url !== "" ? url.slice(url.lastIndexOf("/") + 1) : null;
