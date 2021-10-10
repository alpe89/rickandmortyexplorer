import { Flex, Button, FlexProps } from "@chakra-ui/react";
import { FC } from "react";
import { Info } from "../../types";

type Props = FlexProps & {
    paginationInfo?: Info;
    page?: number;
    onPageChange: (nextPage: number) => void;
};

export const Pagination: FC<Props> = ({ paginationInfo, page = 1, onPageChange, ...props }) => {
    const onNextClickHandler = () => {
        if (paginationInfo?.next) {
            onPageChange(page + 1);
        }
    };

    const onPrevClickHandler = () => {
        if (paginationInfo?.prev) {
            onPageChange(page - 1);
        }
    };

    if (!paginationInfo) {
        return null;
    }

    return (
        <Flex justifyContent="space-between" pt="4" px="8" {...props}>
            <Button
                bg="brand.primary"
                _hover={{ bg: "teal.500", _disabled: { bg: "brand.primary" } }}
                disabled={paginationInfo.prev === null}
                onClick={onPrevClickHandler}
            >
                Previous
            </Button>
            <Button
                bg="brand.primary"
                _hover={{ bg: "teal.500", _disabled: { bg: "brand.primary" } }}
                disabled={paginationInfo.next === null}
                onClick={onNextClickHandler}
            >
                Next
            </Button>
        </Flex>
    );
};
