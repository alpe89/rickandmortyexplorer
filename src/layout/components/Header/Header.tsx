import { Flex, Heading } from "@chakra-ui/layout";

export const Header = () => (
    <Flex
        as="header"
        justifyContent="center"
        alignItems="center"
        py="12"
        px={["2", "6", "12", "20"]}
        bg="brand.primary"
        textAlign="center"
    >
        <Heading as="h1" size="4xl" fontWeight="bold">
            The Rick and Morty Explorer
        </Heading>
    </Flex>
);
