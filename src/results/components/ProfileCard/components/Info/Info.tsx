import { FC } from "react";
import { Table, Thead, Th, Tr, Tbody, Td } from "@chakra-ui/react";
import { Character } from "../../../../../types";
import { normalizeEmptyString } from "../../../../../helpers";

type Props = Pick<Character, "gender" | "type" | "species">;

export const Info: FC<Props> = ({ gender, type, species }) => {
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>gender</Th>
                    <Th>species</Th>
                    <Th>type</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>{gender}</Td>
                    <Td>{normalizeEmptyString(species)}</Td>
                    <Td>{normalizeEmptyString(type)}</Td>
                </Tr>
            </Tbody>
        </Table>
    );
};
