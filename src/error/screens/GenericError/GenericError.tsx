import { Box, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

type Props = { error: Error };

export const GenericError: FC<Props> = ({ error }) => {
    return (
        <Box bg="red.400" borderRadius="md" px="12" py="12" mt="12" mx="12">
            <Heading color="red.600" as="h1" fontWeight="bold" size="4xl">
                💥 Wubba Lubba Dub Dub! 💥
            </Heading>
            <Box ml="8">
                <Text color="gray.700" fontSize="lg" mt="8">
                    It seems that something went wrong, try to refresh the page as a first step.
                </Text>
                <Text color="gray.700" fontSize="smaller" mt="4">
                    Oh, by the way the problem was: {error.message}
                </Text>
            </Box>
        </Box>
    );
};
