import { Badge } from "@chakra-ui/react";
import { FC } from "react";
import { Character } from "../../../../../types";

type Props = Pick<Character, "status">;

export const StatusBadge: FC<Props> = ({ status }) => {
    const colorMap = {
        Alive: "green",
        Dead: "red",
        unknown: "orange",
    };

    return (
        <Badge variant="subtle" colorScheme={colorMap[status]} height="auto" ml="2" mb="0.5">
            {status}
        </Badge>
    );
};
