import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors: {
        brand: {
            primary: "#62A4AB",
            secondary: "#",
        },
    },
    styles: {
        global: {
            body: {
                bg: "gray.800",
                color: "white",
            },
        },
    },
});
