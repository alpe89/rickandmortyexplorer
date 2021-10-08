import { Flex, Heading } from "@chakra-ui/layout";

export const Header = () => (
    <Flex
        as="header"
        justifyContent="center"
        alignItems="center"
        py="22"
        px="40"
        bg="brand.primary"
    >
        <Heading as="h1" size="4xl">
            The Rick and Morty Explorer
        </Heading>
    </Flex>
);
