import { FC } from "react";
import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Profile } from "../../../../../types";

type Props = {
    episodes: Profile["episodeInfo"];
};

export const Episodes: FC<Props> = ({ episodes }) => {
    return episodes.length === 0 ? (
        <Text>No episodes found</Text>
    ) : (
        <SimpleGrid columns={3} gap={4}>
            {episodes.map(episode => (
                <Flex
                    boxShadow="md"
                    borderRadius="md"
                    bg="gray.800"
                    key={`episode_${episode}`}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Text fontSize="smaller" textAlign="center">
                        {episode}
                    </Text>
                </Flex>
            ))}
        </SimpleGrid>
    );
};
