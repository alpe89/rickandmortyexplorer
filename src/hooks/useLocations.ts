import { useCallback, useState } from "react";
import { getLocation } from "rickmortyapi";
import { useDataSource } from "../data";
import { Location, LocationInfo } from "../types";

export const useLocations = () => {
    const { locations, setLocations } = useDataSource();
    const [isFetchingLocations, setIsFetchingLocations] = useState<boolean>(false);

    const fetchLocations = useCallback(
        async (locationIds: number[]) => {
            if (locationIds.length > 0) {
                setIsFetchingLocations(true);
                try {
                    const response = await getLocation(locationIds);

                    if (response.data) {
                        response.data.forEach(location => {
                            setLocations(draft => {
                                if (!draft[location.name]) {
                                    draft[location.name] = location;
                                }
                            });
                        });
                    }
                    setIsFetchingLocations(false);
                } catch (e: any) {
                    setIsFetchingLocations(false);
                    throw new Error(e.message);
                }
            }
        },
        [setLocations]
    );

    const locationAdapter = useCallback((location: Location): LocationInfo => {
        if (!location) return {} as LocationInfo;

        return (({ id, created, ...rest }) => rest)(location);
    }, []);

    const createLocationInfo = useCallback((location: Location) => locationAdapter(location), [locationAdapter]);

    return { locations, fetchLocations, createLocationInfo, isFetchingLocations };
};
