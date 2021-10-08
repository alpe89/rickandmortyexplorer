import { FC } from "react";
import { FlexProps } from "@chakra-ui/layout";
import { AnimatedBox } from "../AnimatedBox";
import spinner from "../../assets/images/spinner.png";
import { MotionProps } from "framer-motion";

type Props = FlexProps & MotionProps;

export const Spinner: FC<Props> = ({ ...props }) => {
    return (
        <AnimatedBox
            animate={{ rotate: 360 }}
            transition={
                {
                    duration: 0.7,
                    repeat: "Infinity",
                    ease: "linear",
                } as never
            }
            {...props}
        >
            <img
                src={spinner}
                alt="Loading indicator"
                width="100%"
                height="auto"
            />
        </AnimatedBox>
    );
};
