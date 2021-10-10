import { FC } from "react";
import { Tab } from "@chakra-ui/react";

type Props = {
    children: string;
};

export const ProfileTab: FC<Props> = ({ children }) => {
    return (
        <Tab
            _selected={{ color: "white", bg: "brand.primary", border: "none", boxShadow: "md" }}
            _active={{ color: "white", bg: "brand.primary", border: "none", boxShadow: "none" }}
        >
            {children}
        </Tab>
    );
};
