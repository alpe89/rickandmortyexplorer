import { Flex, Grid } from "@chakra-ui/layout";
import { Header, Results } from "../../components";

export const Layout = () => (
    <>
        <Header />
        <Flex as="main" px="8" py="12" justifyContent="center" alignItems="center">
            <Grid
                as="section"
                templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
                gap="8"
            >
                <Results />
            </Grid>
        </Flex>
    </>
);
