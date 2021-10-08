import { motion, MotionProps } from "framer-motion";
import { Flex, FlexProps } from "@chakra-ui/layout";

export const AnimatedBox = motion<FlexProps & MotionProps>(Flex);
