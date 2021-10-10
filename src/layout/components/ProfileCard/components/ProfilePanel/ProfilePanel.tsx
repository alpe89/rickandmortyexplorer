import { TabPanel, TabPanelProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = TabPanelProps & {
    children: ReactNode;
};

export const ProfilePanel: FC<Props> = ({ children, ...props }) => (
    <TabPanel bg="brand.primary" py="4" px="4" borderRadius="sm" minH="180px" {...props}>
        {children}
    </TabPanel>
);
