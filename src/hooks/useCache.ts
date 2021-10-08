import { useState } from "react";
import { ResourceCache, Resource } from "../types";

export const useCache = () => {
    const [cache, setCache] = useState<ResourceCache>(() => {
        const emptyCache: ResourceCache = {
            [Resource.CHARACTERS]: undefined,
            [Resource.LOCATIONS]: undefined,
            [Resource.EPISODES]: undefined,
        };
        return emptyCache;
    });

    return { cache, setCache };
};
