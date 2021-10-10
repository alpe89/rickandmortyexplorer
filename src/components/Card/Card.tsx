import { Box, BoxProps, Flex, FlexProps, Heading, HeadingProps } from "@chakra-ui/layout";
import { FC, ReactNode } from "react";

type Props = FlexProps & {
    title?: string;
    headerBoxStyle?: BoxProps;
    headerTextStyle?: HeadingProps;
    children: ReactNode;
};

export const Card: FC<Props> = ({ title, headerBoxStyle = {}, headerTextStyle = {}, children, ...props }) => {
    return (
        <Flex flexDirection="column" bg="white" px="6" py="16" borderRadius="md" {...props}>
            {title && (
                <Box as="header" {...headerBoxStyle}>
                    <Heading as="h2" size="xl" {...headerTextStyle}>
                        {title}
                    </Heading>
                </Box>
            )}
            {children}
        </Flex>
    );
};
