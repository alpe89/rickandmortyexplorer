import { Wrap, Flex } from "@chakra-ui/layout";
import { Header } from "../../components";

export const Layout = () => (
    <>
        <Header />
        <Flex as="main" px="52" py="28">
            <Wrap as="section">Content Here</Wrap>
        </Flex>
    </>
);
