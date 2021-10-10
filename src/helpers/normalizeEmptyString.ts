export const normalizeEmptyString = (value: string, replaceWith: string = "N/D") =>
    !value || value === "" ? replaceWith : value;
