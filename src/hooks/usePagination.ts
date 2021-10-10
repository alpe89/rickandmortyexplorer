import { useState } from "react";
import { Info } from "../types";

export const usePagination = (info: Info) => {
    const [page, setPage] = useState(1);

    return { page };
};
