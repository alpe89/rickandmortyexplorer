import { useCallback, useState } from "react";
import { getEpisode } from "rickmortyapi";
import { getIdFromResourceUrl } from "../helpers";
import { useDataSource } from "../data";

export const useEpisodes = () => {
    const { episodes, setEpisodes } = useDataSource();
    const [isFetchingEpisodes, setIsFetchingEpisodes] = useState<boolean>(false);

    const fetchEpisodes = useCallback(
        async (episodeIds: number[]) => {
            if (episodeIds.length > 0) {
                setIsFetchingEpisodes(true);
                try {
                    const response = await getEpisode(episodeIds);
                    setIsFetchingEpisodes(false);

                    if (response.data) {
                        response.data.forEach(episode => {
                            setEpisodes(draft => {
                                if (!draft[episode.id]) {
                                    draft[episode.id] = { name: episode.name, episode: episode.episode };
                                }
                            });
                        });
                    }
                } catch (e) {
                    setIsFetchingEpisodes(false);
                    throw new Error(e as any);
                }
            }
        },
        [setEpisodes]
    );

    const createEpisodeInfo = useCallback(
        (episodesUrl: string[]) => {
            return episodesUrl.map(episodeUrl => {
                const episodeId = getIdFromResourceUrl(episodeUrl)!;
                return episodes[episodeId];
            });
        },
        [episodes]
    );

    return { episodes, fetchEpisodes, createEpisodeInfo, isFetchingEpisodes };
};
