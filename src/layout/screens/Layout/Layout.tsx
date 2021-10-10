import { Flex } from "@chakra-ui/layout";
import { FC, ReactNode } from "react";
import { Header } from "../../components";

type Props = { children: ReactNode };

export const Layout: FC<Props> = ({ children }) => (
    <>
        <Header />
        <Flex as="main" px="8" py="12" justifyContent="center" alignItems="center">
            {children}
        </Flex>
    </>
);
