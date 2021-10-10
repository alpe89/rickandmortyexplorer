import { FC, useMemo } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { normalizeEmptyString } from "../../../../../helpers";
import { Location } from "../../../../../types";

type Props = Pick<Location, "name" | "dimension" | "type" | "residents">;

export const LocationInfo: FC<Props> = ({ name, dimension, type, residents }) => {
    const residentsCount = useMemo(() => (residents ? residents.length.toString() : "unknown"), [residents]);

    return (
        <Table variant="simple" size="sm">
            <Thead>
                <Tr>
                    <Th>name</Th>
                    <Th>dimension</Th>
                    <Th>type</Th>
                    <Th>people</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>{normalizeEmptyString(name)}</Td>
                    <Td>{normalizeEmptyString(dimension)}</Td>
                    <Td>{normalizeEmptyString(type)}</Td>
                    <Td>{residentsCount}</Td>
                </Tr>
            </Tbody>
        </Table>
    );
};
